<script setup lang="ts">
// External imports
import Chart from 'chart.js/auto';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Internal imports
import KpiGridComponent from '@/components/dashboard/KpiGridComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';

import { AuthService } from '@/services/AuthService';
import { ReservationService } from '@/services/ReservationService';
import { DateFormatUtil } from '@/utils/DateFormatUtil';

// Variables
let chartInstance: Chart | null = null;

// Reactive state
const chartCanvasRef = ref<HTMLCanvasElement | null>(null);
const selectedPeriod = ref<'6_months' | '1_year' | 'this_month'>('6_months');

// Selectors
const periodOptions = [
  { value: '6_months', label: 'Últimos 6 meses' },
  { value: '1_year', label: 'Último año' },
  { value: 'this_month', label: 'Este mes' },
];

const chartData = computed(() => {
  const currentUser = AuthService.getCurrentUser();
  const reservations = currentUser?.restaurantId ? ReservationService.getByRestaurantId(currentUser.restaurantId) : [];
  
  const now = new Date();
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  if (selectedPeriod.value === '6_months') {
    const labels: string[] = [];
    const data = [0, 0, 0, 0, 0, 0];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = monthNames[d.getMonth()];
      if (monthName) labels.push(monthName);
    }
    
    reservations.forEach((r) => {
      const date = DateFormatUtil.parseDate(r.reservationDate);
      if (!date) return;
      
      const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();
      if (diffMonths >= 0 && diffMonths < 6) {
        const idx = 5 - diffMonths;
        data[idx] = (data[idx] ?? 0) + 1;
      }
    });
    
    return { labels, data };
  }
  
  if (selectedPeriod.value === '1_year') {
    const labels: string[] = [];
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = monthNames[d.getMonth()];
      if (monthName) labels.push(monthName);
    }
    
    reservations.forEach((r) => {
      const date = DateFormatUtil.parseDate(r.reservationDate);
      if (!date) return;
      
      const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();
      if (diffMonths >= 0 && diffMonths < 12) {
        const idx = 11 - diffMonths;
        data[idx] = (data[idx] ?? 0) + 1;
      }
    });
    
    return { labels, data };
  }
  
  // this_month
  const labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
  const data = [0, 0, 0, 0];
  
  reservations.forEach((r) => {
    const date = DateFormatUtil.parseDate(r.reservationDate);
    if (!date) return;
    
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
      const day = date.getDate();
      if (day <= 7) data[0] = (data[0] ?? 0) + 1;
      else if (day <= 14) data[1] = (data[1] ?? 0) + 1;
      else if (day <= 21) data[2] = (data[2] ?? 0) + 1;
      else data[3] = (data[3] ?? 0) + 1;
    }
  });
  
  return { labels, data };
});

// Methods
function renderChart(): void {
  if (!chartCanvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const current = chartData.value;

  chartInstance = new Chart(chartCanvasRef.value, {
    type: 'bar',
    data: {
      labels: current.labels,
      datasets: [
        {
          label: 'Reservas',
          data: current.data,
          backgroundColor: '#1A3D2B',
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

// Watchers
watch(chartData, () => {
  renderChart();
}, { deep: true });

// Lifecycle
onMounted(() => {
  renderChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
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
        <div class="max-w-7xl mx-auto space-y-6">
          <!-- KPI Cards Grid (4 cards) -->
          <KpiGridComponent />

          <!-- Interactive Trend Chart Card -->
          <article class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-4">
            <!-- Chart Header -->
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h2
                  class="text-base md:text-lg font-bold text-stone-900 tracking-tight font-heading"
                >
                  Reservas por mes (línea de tendencia)
                </h2>
                <p class="text-xs text-stone-400 font-medium mt-0.5">
                  Usa el selector para cambiar el período
                </p>
              </div>

              <!-- Period Selector -->
              <div class="space-y-1">
                <label
                  for="period-select"
                  class="block text-[10px] font-bold text-stone-400 uppercase tracking-wider"
                >
                  PERÍODO
                </label>
                <select
                  id="period-select"
                  v-model="selectedPeriod"
                  class="px-3.5 py-1.5 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none cursor-pointer hover:border-stone-400 transition-colors"
                >
                  <option v-for="option in periodOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Direct Canvas Chart Display -->
            <div class="h-72 w-full pt-2 relative">
              <canvas ref="chartCanvasRef" />
            </div>
          </article>
        </div>
      </main>
    </div>
  </div>
</template>
