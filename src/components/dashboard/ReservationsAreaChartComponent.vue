<script setup lang="ts">
// Imports
import BaseChartComponent from '@/components/common/BaseChartComponent.vue';
import type { ChartData } from 'chart.js';

// Selectors
const chartData: ChartData<'line'> = {
  labels: ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Reservas',
      data: [45, 62, 58, 80, 95, 72],
      fill: true,
      backgroundColor: 'rgba(26, 61, 43, 0.12)',
      borderColor: '#1A3D2B',
      borderWidth: 2.75,
      tension: 0.4,
      pointBackgroundColor: '#1A3D2B',
      pointBorderColor: '#FFFFFF',
      pointBorderWidth: 2,
      pointRadius: 4.5,
      pointHoverRadius: 7,
    },
  ],
};
</script>

<template>
  <div
    class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
  >
    <!-- Header with Title & Badge -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-base md:text-lg font-bold text-stone-800 tracking-tight">Reservas por mes</h2>

      <span
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200"
      >
        +18% vs mes anterior
      </span>
    </div>

    <!-- Chart container with fixed height -->
    <div class="w-full h-56 relative">
      <BaseChartComponent type="line" :data="chartData" />
    </div>
  </div>
</template>
