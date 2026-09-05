<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';

// Internal imports
import DoughnutChartComponent from '@/components/dashboard/DoughnutChartComponent.vue';
import StatusBadgeComponent from '@/components/common/StatusBadgeComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';
import { AuthService } from '@/services/AuthService';
import { ReservationService } from '@/services/ReservationService';
import { UserService } from '@/services/UserService';
import { StringFormatUtil } from '@/utils/StringFormatUtil';

// Reactive state
const selectedStatus = ref<'Todas' | ReservationStatus>('Todas');
const selectedPeople = ref<string>('Todos');

// Selectors
const statusOptions: { value: 'Todas' | ReservationStatus; label: string }[] = [
  { value: 'Todas', label: 'Todas' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'confirmed', label: 'Confirmada' },
  { value: 'completed', label: 'Completada' },
  { value: 'cancelled', label: 'Cancelada' },
];

const peopleOptions = [
  { value: 'Todos', label: 'Todos' },
  { value: '1-2', label: '1-2' },
  { value: '3-4', label: '3-4' },
  { value: '5-6', label: '5-6' },
  { value: '7+', label: '7+' },
];

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());

const restaurantReservations = computed<ReservationInterface[]>(() => {
  if (!currentUser.value?.restaurantId) return [];
  return ReservationService.getByRestaurantId(currentUser.value.restaurantId);
});

const filteredReservations = computed<ReservationInterface[]>(() => {
  return restaurantReservations.value.filter((r) => {
    const matchesStatus =
      selectedStatus.value === 'Todas' || r.status === selectedStatus.value;

    let matchesPeople = true;
    if (selectedPeople.value !== 'Todos') {
      if (selectedPeople.value === '7+') {
        matchesPeople = r.numberOfPeople >= 7;
      } else {
        const parts = selectedPeople.value.split('-').map(Number);
        const min = parts[0] ?? 0;
        const max = parts[1] ?? 0;
        matchesPeople = r.numberOfPeople >= min && r.numberOfPeople <= max;
      }
    }

    return matchesStatus && matchesPeople;
  });
});

// Chart data computed from filtered reservations
const chartLabels = ['Pendientes', 'Confirmadas', 'Completadas', 'Canceladas'];
const chartColors = ['#F59E0B', '#22C55E', '#9CA3AF', '#EF4444'];

const chartData = computed<number[]>(() => {
  const statuses: ReservationStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];
  return statuses.map(
    (status) => filteredReservations.value.filter((r) => r.status === status).length,
  );
});

// Methods
function getClientName(userId: number): string {
  return UserService.getNameById(userId);
}

function getClientInitial(userId: number): string {
  const name = UserService.getNameById(userId);
  return StringFormatUtil.getInitials(name).charAt(0);
}

function formatReservationId(id: number): string {
  return `RES-${String(id).padStart(3, '0')}`;
}

function handleConfirm(id: number): void {
  ReservationService.updateStatus(id, 'confirmed');
}

function handleComplete(id: number): void {
  ReservationService.updateStatus(id, 'completed');
}

function handleCancel(id: number): void {
  ReservationService.updateStatus(id, 'cancelled');
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Sidebar -->
    <SidebarComponent role="admin" />

    <!-- Content column with persistent top header and scrollable body -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Header -->
      <HeaderComponent class="shrink-0" />

      <!-- Main Page Content -->
      <main class="flex-1 px-8 pb-20 overflow-y-auto">
        <div class="flex gap-6 max-w-7xl mx-auto">
          <!-- Left Column: Filters + Table -->
          <div class="flex-1 min-w-0 space-y-6">
            <!-- Filter Card -->
            <div
              class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div class="flex flex-wrap items-center gap-6">
                <!-- Status filter -->
                <div class="space-y-1">
                  <label
                    for="status-select"
                    class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                  >
                    ESTADO
                  </label>
                  <select
                    id="status-select"
                    v-model="selectedStatus"
                    class="px-3.5 py-2 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none cursor-pointer hover:border-stone-400 transition-colors"
                  >
                    <option
                      v-for="option in statusOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>

                <!-- People filter -->
                <div class="space-y-1">
                  <label
                    for="people-select"
                    class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                  >
                    PERSONAS
                  </label>
                  <select
                    id="people-select"
                    v-model="selectedPeople"
                    class="px-3.5 py-2 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none cursor-pointer hover:border-stone-400 transition-colors"
                  >
                    <option
                      v-for="option in peopleOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Counter badge -->
              <span class="text-xs font-semibold text-stone-400">
                <strong class="text-stone-800">{{ filteredReservations.length }}</strong> reservas
              </span>
            </div>

            <!-- Reservations Table -->
            <div class="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-stone-100">
                    <th
                      class="px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                    >
                      Cliente
                    </th>
                    <th
                      class="px-4 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                    >
                      Fecha
                    </th>
                    <th
                      class="px-4 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                    >
                      Hora
                    </th>
                    <th
                      class="px-4 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                    >
                      Personas
                    </th>
                    <th
                      class="px-4 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      class="px-4 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="reservation in filteredReservations"
                    :key="reservation.id"
                    class="border-b border-stone-50 last:border-b-0 hover:bg-stone-50/50 transition-colors"
                  >
                    <!-- Client -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-xs font-bold shrink-0"
                        >
                          {{ getClientInitial(reservation.userId) }}
                        </div>
                        <div>
                          <p class="text-sm font-semibold text-stone-800 leading-tight">
                            {{ getClientName(reservation.userId) }}
                          </p>
                          <p class="text-[11px] text-stone-400 font-medium mt-0.5">
                            {{ formatReservationId(reservation.id) }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <!-- Date -->
                    <td class="px-4 py-4 text-sm text-stone-700 font-medium">
                      {{ reservation.reservationDate }}
                    </td>

                    <!-- Time -->
                    <td class="px-4 py-4 text-sm text-stone-700 font-medium">
                      {{ reservation.reservationTime }}
                    </td>

                    <!-- People -->
                    <td class="px-4 py-4 text-sm font-semibold text-stone-800">
                      {{ reservation.numberOfPeople }}
                    </td>

                    <!-- Status -->
                    <td class="px-4 py-4">
                      <StatusBadgeComponent :status="reservation.status" />
                    </td>

                    <!-- Actions -->
                    <td class="px-4 py-4">
                      <div class="flex items-center gap-2">
                        <!-- Pending: Confirm + Cancel -->
                        <template v-if="reservation.status === 'pending'">
                          <button
                            type="button"
                            class="text-xs font-semibold text-green-700 hover:text-green-800 cursor-pointer transition-colors"
                            @click="handleConfirm(reservation.id)"
                          >
                            Confirmar
                          </button>
                          <button
                            type="button"
                            class="text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer transition-colors"
                            @click="handleCancel(reservation.id)"
                          >
                            Cancelar
                          </button>
                        </template>

                        <!-- Confirmed: Complete + Cancel -->
                        <template v-else-if="reservation.status === 'confirmed'">
                          <button
                            type="button"
                            class="text-xs font-semibold text-green-700 hover:text-green-800 cursor-pointer transition-colors"
                            @click="handleComplete(reservation.id)"
                          >
                            Completar
                          </button>
                          <button
                            type="button"
                            class="text-xs font-semibold text-red-500 hover:text-red-600 cursor-pointer transition-colors"
                            @click="handleCancel(reservation.id)"
                          >
                            Cancelar
                          </button>
                        </template>
                      </div>
                    </td>
                  </tr>

                  <!-- Empty state -->
                  <tr v-if="filteredReservations.length === 0">
                    <td colspan="6" class="px-6 py-12 text-center">
                      <p class="text-sm text-stone-400 font-medium">
                        No se encontraron reservas con los filtros seleccionados.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right Column: Doughnut Chart -->
          <div class="w-72 shrink-0">
            <DoughnutChartComponent
              title="Estado de reservas"
              subtitle="Distribución según filtros activos"
              :labels="chartLabels"
              :data="chartData"
              :colors="chartColors"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
