<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { CheckCircle2 } from 'lucide-vue-next';

import HourlyReservationsChartComponent from '@/components/dashboard/HourlyReservationsChartComponent.vue';
import KpiGridComponent from '@/components/dashboard/KpiGridComponent.vue';
import PeoplePerDateChartComponent from '@/components/dashboard/PeoplePerDateChartComponent.vue';
import RatingDistributionChartComponent from '@/components/dashboard/RatingDistributionChartComponent.vue';
import RecentReviewsComponent from '@/components/dashboard/RecentReviewsComponent.vue';
import ReservationsAreaChartComponent from '@/components/dashboard/ReservationsAreaChartComponent.vue';
import ReservationsDonutChartComponent from '@/components/dashboard/ReservationsDonutChartComponent.vue';
import ReservationsTableComponent from '@/components/dashboard/ReservationsTableComponent.vue';
import UpcomingReservationsComponent from '@/components/dashboard/UpcomingReservationsComponent.vue';
import AdminHeaderComponent from '@/components/layout/AdminHeaderComponent.vue';
import AdminSidebarComponent from '@/components/layout/AdminSidebarComponent.vue';

// Variables
const route = useRoute();

// Reactive state
const activeFilters = ref({
  dateRange: 'last_30_days',
  status: 'all',
});

const isRefreshing = ref(false);
const showFeedbackToast = ref(false);

// Methods
function handleRefreshDashboard(): void {
  isRefreshing.value = true;
  showFeedbackToast.value = true;

  setTimeout(() => {
    isRefreshing.value = false;
  }, 400);

  setTimeout(() => {
    showFeedbackToast.value = false;
  }, 2500);
}

function handleFilterChange(filters: { dateRange: string; status: string }): void {
  activeFilters.value = filters;
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Admin Sidebar -->
    <AdminSidebarComponent />

    <!-- Content column with persistent top header and scrollable body -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Admin Header -->
      <AdminHeaderComponent
        class="shrink-0"
        @refresh="handleRefreshDashboard"
        @filter-change="handleFilterChange"
      />

      <!-- Main Page Content -->
      <main class="flex-1 p-6 md:p-8 overflow-y-auto">
        <!-- Dashboard page -->
        <div v-if="route.path === '/admin/dashboard'" class="max-w-7xl mx-auto space-y-6">
          <!-- KPI Cards Grid -->
          <KpiGridComponent />

          <!-- Area and Donut -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ReservationsAreaChartComponent class="lg:col-span-2" />
            <ReservationsDonutChartComponent class="lg:col-span-1" />
          </div>

          <!-- Hourly + People per date + Ratings -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HourlyReservationsChartComponent />
            <PeoplePerDateChartComponent />
            <RatingDistributionChartComponent />
          </div>

          <!-- Reservations Data Table -->
          <ReservationsTableComponent :status-filter="activeFilters.status" />

          <!-- Upcoming Reservations & Recent Reviews -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingReservationsComponent />
            <RecentReviewsComponent />
          </div>
        </div>

        <!-- Other admin sub-routes view -->
        <div v-else class="py-4">
          <p class="text-sm text-stone-500">Sección en desarrollo.</p>
        </div>
      </main>
    </div>

    <!-- Toast Notification on Refresh -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-4 opacity-0"
    >
      <div
        v-if="showFeedbackToast"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#1A3D2B] text-white text-xs font-semibold rounded-2xl shadow-xl border border-emerald-800 pointer-events-none"
      >
        <CheckCircle2 class="w-4 h-4 text-[#E8A020]" />
        <span>Dashboard actualizado con éxito</span>
      </div>
    </Transition>
  </div>
</template>
