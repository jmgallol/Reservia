<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';

import StatusBadgeComponent from '@/components/common/StatusBadgeComponent.vue';
import DoughnutChartComponent from '@/components/dashboard/DoughnutChartComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import EditReservationModalComponent from '@/components/reservation/EditReservationModalComponent.vue';

import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';

import { AuthService } from '@/services/AuthService';
import { ReservationService } from '@/services/ReservationService';
import { RestaurantService } from '@/services/RestaurantService';
import { DateFormatUtil } from '@/utils/DateFormatUtil';

// Constants
const statusLabels = ['Pendientes', 'Confirmadas', 'Completadas', 'Canceladas'];
const statusColors = ['#F59E0B', '#22C55E', '#9CA3AF', '#EF4444'];
const statusOrder: ReservationStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];
const statusOptions: { label: string; value: 'Todas' | ReservationStatus }[] = [
  { label: 'Todas', value: 'Todas' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Confirmadas', value: 'confirmed' },
  { label: 'Completadas', value: 'completed' },
  { label: 'Canceladas', value: 'cancelled' },
];

// Reactive variables
const selectedStatus = ref<'Todas' | ReservationStatus>('Todas');
const showEditModal = ref(false);
const selectedReservation = ref<ReservationInterface | null>(null);

// Computed
const currentUserReservations = computed<ReservationInterface[]>(() => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return [];

  return ReservationService.getByUserId(currentUser.id);
});

const visibleReservations = computed<ReservationInterface[]>(() => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return [];

  return ReservationService.filterByClient(currentUser.id, selectedStatus.value);
});

const statusChartData = computed<number[]>(() =>
  statusOrder.map(
    (status) => currentUserReservations.value.filter((reservation) => reservation.status === status).length,
  ),
);

const activeCount = computed<number>(() =>
  currentUserReservations.value.filter(
    (reservation) => reservation.status === 'pending' || reservation.status === 'confirmed',
  ).length,
);

const completedCount = computed<number>(() =>
  currentUserReservations.value.filter((reservation) => reservation.status === 'completed').length,
);

// Methods
function getRestaurantName(restaurantId: number): string {
  return RestaurantService.getById(restaurantId)?.name ?? 'Restaurante no encontrado';
}

function handleCancelReservation(reservation: ReservationInterface): void {
  const confirmed = confirm('¿Cancelar esta reserva?');
  if (!confirmed) return;

  ReservationService.updateStatus(reservation.id, 'cancelled');
}

function openEditModal(reservation: ReservationInterface): void {
  if (!ReservationService.canManageReservation(reservation.status)) return;

  selectedReservation.value = reservation;
  showEditModal.value = true;
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Sidebar -->
    <SidebarComponent role="client" />

    <!-- Content column with persistent top header and scrollable body -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Header -->
      <HeaderComponent class="shrink-0" />

      <!-- Main Page Content -->
      <main class="flex-1 px-8 pb-24 overflow-y-auto">
        <div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 max-w-7xl mx-auto">
          <section class="space-y-5">
            <div
              class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h2 class="text-lg font-bold text-stone-900 tracking-tight font-heading">
                  Mis Reservas
                </h2>
                <p class="text-stone-500 text-xs mt-1">
                  Consulta y gestiona tus reservas activas
                </p>
              </div>

              <div class="flex flex-wrap items-end gap-4">
                <div class="space-y-1">
                  <label
                    for="reservation-status"
                    class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                  >
                    Estado
                  </label>
                  <select
                    id="reservation-status"
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

                <span class="pb-2 text-xs font-semibold text-stone-400">
                  <strong class="text-stone-800">{{ visibleReservations.length }}</strong> reservas
                </span>
              </div>
            </div>

            <div
              v-if="visibleReservations.length === 0"
              class="bg-white rounded-2xl border border-stone-200/80 shadow-xs px-6 py-12 text-center"
            >
              <p class="text-sm font-medium text-stone-500">No tienes reservas registradas</p>
            </div>

            <div v-else class="space-y-5">
              <article
                v-for="reservation in visibleReservations"
                :key="reservation.id"
                class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-5"
              >
                <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h3 class="text-lg font-bold text-stone-900 font-heading">
                      {{ getRestaurantName(reservation.restaurantId) }}
                    </h3>
                  </div>

                  <StatusBadgeComponent :status="reservation.status" />
                </div>

                <dl class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <dt class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Fecha
                    </dt>
                    <dd class="mt-1 text-sm font-semibold text-stone-800">
                      {{ DateFormatUtil.formatDate(reservation.reservationDate) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Hora
                    </dt>
                    <dd class="mt-1 text-sm font-semibold text-stone-800">
                      {{ reservation.reservationTime }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Personas
                    </dt>
                    <dd class="mt-1 text-sm font-semibold text-stone-800">
                      {{ reservation.numberOfPeople }}
                    </dd>
                  </div>
                </dl>

                <p
                  v-if="reservation.specialRequest"
                  class="rounded-xl bg-[#FAF8F4] px-4 py-3 text-sm text-stone-600"
                >
                  {{ reservation.specialRequest }}
                </p>

                <div
                  v-if="ReservationService.canManageReservation(reservation.status)"
                  class="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-100"
                >
                  <button
                    type="button"
                    class="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                    @click="openEditModal(reservation)"
                  >
                    Modificar
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 rounded-xl bg-red-50 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                    @click="handleCancelReservation(reservation)"
                  >
                    Cancelar
                  </button>
                </div>
              </article>
            </div>
          </section>

          <aside class="space-y-5">
            <!-- Doughnut Chart (reused component) -->
            <DoughnutChartComponent
              title="Mis reservas"
              subtitle="Distribución por estado"
              :labels="statusLabels"
              :data="statusChartData"
              :colors="statusColors"
            />

            <!-- Resumen -->
            <section class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-4">
              <h3 class="text-base font-bold text-stone-900 font-heading tracking-tight">
                Resumen
              </h3>

              <ul class="space-y-3">
                <li class="flex items-center justify-between">
                  <span class="flex items-center gap-2.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-stone-800 shrink-0" />
                    <span class="text-sm font-medium text-stone-600">Total reservas</span>
                  </span>
                  <span class="text-sm font-bold text-stone-900">{{ currentUserReservations.length }}</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="flex items-center gap-2.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <span class="text-sm font-medium text-stone-600">Activas</span>
                  </span>
                  <span class="text-sm font-bold text-amber-500">{{ activeCount }}</span>
                </li>
                <li class="flex items-center justify-between">
                  <span class="flex items-center gap-2.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                    <span class="text-sm font-medium text-stone-600">Completadas</span>
                  </span>
                  <span class="text-sm font-bold text-green-500">{{ completedCount }}</span>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </div>

    <!-- Edit Reservation Modal -->
    <EditReservationModalComponent
      v-model="showEditModal"
      :reservation="selectedReservation"
    />
  </div>
</template>
