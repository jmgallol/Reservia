<script setup lang="ts">
// External imports
import Chart from 'chart.js/auto';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Internal imports
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import StatusBadgeComponent from '@/components/common/StatusBadgeComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';

import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';

import { AuthService } from '@/services/AuthService';
import { ReservationService } from '@/services/ReservationService';
import { RestaurantService } from '@/services/RestaurantService';

interface StatusOption {
  label: string;
  value: 'Todas' | ReservationStatus;
}

interface MonthlyReservationCount {
  label: string;
  count: number;
  sortKey: string;
}

// Variables
let statusChartInstance: Chart | null = null;
let monthlyChartInstance: Chart | null = null;

const statusLabels = ['Pendientes', 'Confirmadas', 'Completadas', 'Canceladas'];
const statusColors = ['#F59E0B', '#22C55E', '#9CA3AF', '#EF4444'];
const statusOrder: ReservationStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];
const monthNames = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];
const statusOptions: StatusOption[] = [
  { label: 'Todas', value: 'Todas' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Confirmadas', value: 'confirmed' },
  { label: 'Completadas', value: 'completed' },
  { label: 'Canceladas', value: 'cancelled' },
];

// Reactive state
const selectedStatus = ref<'Todas' | ReservationStatus>('Todas');
const statusChartRef = ref<HTMLCanvasElement | null>(null);
const monthlyChartRef = ref<HTMLCanvasElement | null>(null);
const showEditModal = ref(false);
const selectedReservation = ref<ReservationInterface | null>(null);
const editReservationDate = ref('');
const editReservationTime = ref('');
const editNumberOfPeople = ref(1);
const editSpecialRequest = ref('');
const editErrorMessage = ref('');

// Computed
const currentUserReservations = computed<ReservationInterface[]>(() => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return [];

  return ReservationService.getAll().filter((reservation) => reservation.userId === currentUser.id);
});

const visibleReservations = computed<ReservationInterface[]>(() => {
  if (selectedStatus.value === 'Todas') return currentUserReservations.value;

  return currentUserReservations.value.filter(
    (reservation) => reservation.status === selectedStatus.value,
  );
});

const statusChartData = computed<number[]>(() =>
  statusOrder.map(
    (status) => currentUserReservations.value.filter((reservation) => reservation.status === status).length,
  ),
);

const monthlyReservationCounts = computed<MonthlyReservationCount[]>(() => {
  const monthMap = new Map<string, MonthlyReservationCount>();

  currentUserReservations.value.forEach((reservation) => {
    const date = parseReservationDate(reservation.reservationDate);
    if (!date) return;

    const sortKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const existing = monthMap.get(sortKey);

    if (existing) {
      existing.count += 1;
      return;
    }

    const monthName = monthNames[date.getMonth()] ?? '';

    monthMap.set(sortKey, {
      count: 1,
      label: `${monthName} ${date.getFullYear()}`,
      sortKey,
    });
  });

  return Array.from(monthMap.values())
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    .slice(-4);
});

const monthlyChartLabels = computed<string[]>(() =>
  monthlyReservationCounts.value.map((month) => month.label),
);

const monthlyChartData = computed<number[]>(() =>
  monthlyReservationCounts.value.map((month) => month.count),
);

// Methods
function getRestaurantName(restaurantId: number): string {
  return RestaurantService.getById(restaurantId)?.name ?? 'Restaurante no encontrado';
}

function formatReservationId(id: number): string {
  return `#${id}`;
}

function parseReservationDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  return date;
}

function canManageReservation(status: ReservationStatus): boolean {
  return status === 'pending' || status === 'confirmed';
}

function handleCancelReservation(reservation: ReservationInterface): void {
  const confirmed = confirm(`¿Cancelar la reserva ${formatReservationId(reservation.id)}?`);
  if (!confirmed) return;

  ReservationService.updateStatus(reservation.id, 'cancelled');
}

function openEditModal(reservation: ReservationInterface): void {
  if (!canManageReservation(reservation.status)) return;

  selectedReservation.value = reservation;
  editReservationDate.value = reservation.reservationDate;
  editReservationTime.value = reservation.reservationTime;
  editNumberOfPeople.value = reservation.numberOfPeople;
  editSpecialRequest.value = reservation.specialRequest ?? '';
  editErrorMessage.value = '';
  showEditModal.value = true;
}

function closeEditModal(): void {
  showEditModal.value = false;
  selectedReservation.value = null;
  editErrorMessage.value = '';
}

function isEditFormValid(): boolean {
  return (
    editReservationDate.value.trim() !== '' &&
    editReservationTime.value.trim() !== '' &&
    Number.isInteger(editNumberOfPeople.value) &&
    editNumberOfPeople.value >= 1
  );
}

function handleSaveEdit(): void {
  if (!selectedReservation.value) return;

  if (!isEditFormValid()) {
    editErrorMessage.value = 'Completa fecha, hora y número de personas válidos.';
    return;
  }

  ReservationService.updateReservation(selectedReservation.value.id, {
    reservationDate: editReservationDate.value,
    reservationTime: editReservationTime.value,
    numberOfPeople: editNumberOfPeople.value,
    specialRequest: editSpecialRequest.value.trim(),
  });

  closeEditModal();
}

function renderStatusChart(): void {
  if (!statusChartRef.value) return;

  if (statusChartInstance) {
    statusChartInstance.destroy();
  }

  statusChartInstance = new Chart(statusChartRef.value, {
    type: 'doughnut',
    data: {
      labels: statusLabels,
      datasets: [
        {
          backgroundColor: statusColors,
          borderWidth: 0,
          data: statusChartData.value,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      cutout: '65%',
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
      responsive: true,
    },
  });
}

function renderMonthlyChart(): void {
  if (!monthlyChartRef.value) return;

  if (monthlyChartInstance) {
    monthlyChartInstance.destroy();
  }

  monthlyChartInstance = new Chart(monthlyChartRef.value, {
    type: 'bar',
    data: {
      labels: monthlyChartLabels.value,
      datasets: [
        {
          backgroundColor: '#C8552A',
          borderRadius: 8,
          data: monthlyChartData.value,
          label: 'Reservas',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    },
  });
}

function renderCharts(): void {
  renderStatusChart();
  renderMonthlyChart();
}

// Watchers
watch(
  [statusChartData, monthlyChartLabels, monthlyChartData],
  () => {
    renderCharts();
  },
);

// Lifecycle
onMounted(() => {
  renderCharts();
});

onBeforeUnmount(() => {
  if (statusChartInstance) {
    statusChartInstance.destroy();
  }

  if (monthlyChartInstance) {
    monthlyChartInstance.destroy();
  }
});
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
                    <p class="text-xs font-semibold text-stone-400">
                      Reserva {{ formatReservationId(reservation.id) }}
                    </p>
                    <h3 class="mt-1 text-lg font-bold text-stone-900 font-heading">
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
                      {{ reservation.reservationDate }}
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
                  v-if="canManageReservation(reservation.status)"
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
            <section class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6">
              <h3 class="text-base font-bold text-stone-900 font-heading">
                Reservas por estado
              </h3>
              <div class="mt-4 h-64">
                <canvas ref="statusChartRef" />
              </div>
            </section>

            <section class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6">
              <h3 class="text-base font-bold text-stone-900 font-heading">
                Reservas por mes
              </h3>
              <p class="mt-1 text-xs text-stone-400">
                Solo fechas registradas en formato válido
              </p>
              <div class="mt-4 h-64">
                <canvas ref="monthlyChartRef" />
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>

    <BaseModalComponent v-model="showEditModal">
      <form class="space-y-5" @submit.prevent="handleSaveEdit">
        <div>
          <h2 class="text-lg font-bold text-stone-900 font-heading">Modificar reserva</h2>
          <p class="mt-1 text-xs text-stone-500">
            Actualiza los datos principales de tu reserva.
          </p>
        </div>

        <p
          v-if="editErrorMessage"
          class="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
        >
          {{ editErrorMessage }}
        </p>

        <div class="space-y-1.5">
          <label
            for="edit-reservation-date"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Fecha
          </label>
          <input
            id="edit-reservation-date"
            v-model="editReservationDate"
            type="date"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label
            for="edit-reservation-time"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Hora
          </label>
          <input
            id="edit-reservation-time"
            v-model="editReservationTime"
            type="time"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label
            for="edit-reservation-people"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Personas
          </label>
          <input
            id="edit-reservation-people"
            v-model.number="editNumberOfPeople"
            type="number"
            min="1"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        <div class="space-y-1.5">
          <label
            for="edit-special-request"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Solicitud especial
          </label>
          <textarea
            id="edit-special-request"
            v-model="editSpecialRequest"
            rows="3"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors resize-none"
          />
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            @click="closeEditModal"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded-xl bg-[#C8552A] text-sm font-semibold text-white hover:bg-[#b54a22] transition-colors cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </form>
    </BaseModalComponent>
  </div>
</template>
