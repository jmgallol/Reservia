<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { Bell, RefreshCw } from 'lucide-vue-next';

import BaseSelectComponent from '@/components/common/BaseSelectComponent.vue';

import { AuthService } from '@/services/AuthService';
import { StringFormatUtil } from '@/utils/StringFormatUtil';

// Emits
const emit = defineEmits<{
  refresh: [];
  filterChange: [filters: { dateRange: string; status: string }];
}>();

// Variables
const route = useRoute();

// Reactive state
const selectedDateRange = ref('last_30_days');
const selectedStatus = ref('all');
const isRefreshing = ref(false);

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());

const adminInitials = computed(() =>
  currentUser.value ? StringFormatUtil.getInitials(currentUser.value.name) : 'AD',
);

const isDashboardRoute = computed(() => route.path === '/admin/dashboard');

const headerInfo = computed(() => {
  switch (route.path) {
    case '/admin/dashboard':
      return {
        title: 'Dashboard — La Toscana',
        subtitle: 'Estadísticas exclusivas de tu restaurante',
      };
    case '/admin/restaurant':
      return {
        title: 'Mi Restaurante',
        subtitle: 'Administrador — solo tu establecimiento',
      };
    case '/admin/reservations':
      return {
        title: 'Reservas',
        subtitle: 'Gestión y control de reservas',
      };
    case '/admin/reviews':
      return {
        title: 'Reseñas',
        subtitle: 'Opiniones y comentarios de clientes',
      };
    default:
      return {
        title: 'Panel de Administración',
        subtitle: 'Gestión de tu establecimiento',
      };
  }
});

// Selectors
const dateRangeOptions = [
  { value: 'last_7_days', label: 'Últimos 7 días' },
  { value: 'last_30_days', label: 'Últimos 30 días' },
  { value: 'this_month', label: 'Este mes' },
  { value: 'this_year', label: 'Este año' },
];

const statusOptions = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'confirmed', label: 'Confirmadas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'completed', label: 'Completadas' },
  { value: 'cancelled', label: 'Canceladas' },
];

// Methods
function handleFilterChange(): void {
  emit('filterChange', {
    dateRange: selectedDateRange.value,
    status: selectedStatus.value,
  });
}

function handleRefresh(): void {
  isRefreshing.value = true;
  emit('refresh');

  setTimeout(() => {
    isRefreshing.value = false;
  }, 600);
}
</script>

<template>
  <!-- Admin Header -->
  <header
    class="w-full bg-white border-b border-stone-200/80 px-8 py-3.5 flex items-center justify-between shadow-xs"
  >
    <div>
      <h1 class="text-xl font-bold text-stone-900 tracking-tight leading-tight">
        {{ headerInfo.title }}
      </h1>
      <p class="text-[#C8552A] text-xs font-medium mt-0.5">
        {{ headerInfo.subtitle }}
      </p>
    </div>

    <div class="flex items-center gap-3">
      <template v-if="isDashboardRoute">
        <!-- BaseSelect for Date Range -->
        <BaseSelectComponent
          id="dashboard-date-range"
          v-model="selectedDateRange"
          :options="dateRangeOptions"
          aria-label="Rango de fechas"
          @change="handleFilterChange"
        />

        <!-- BaseSelect for Status -->
        <BaseSelectComponent
          id="dashboard-status-filter"
          v-model="selectedStatus"
          :options="statusOptions"
          aria-label="Estado de reservas"
          @change="handleFilterChange"
        />

        <!-- Refresh Button -->
        <button
          type="button"
          :disabled="isRefreshing"
          class="inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-white border border-stone-800 text-stone-800 hover:bg-stone-900 hover:text-white rounded-full text-xs font-semibold transition-all duration-200 shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
          @click="handleRefresh"
        >
          <RefreshCw
            :size="12"
            :class="['transition-transform duration-500', { 'animate-spin': isRefreshing }]"
          />
          <span>Actualizar</span>
        </button>
      </template>

      <!-- Notification Bell -->
      <template v-else>
        <button
          type="button"
          aria-label="Notificaciones"
          class="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <Bell :size="18" />
        </button>
      </template>

      <!-- Admin Avatar -->
      <div
        class="w-8 h-8 rounded-full bg-[#C8552A] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm select-none"
        :title="currentUser?.name ?? 'Admin'"
      >
        {{ adminInitials }}
      </div>
    </div>
  </header>
</template>
