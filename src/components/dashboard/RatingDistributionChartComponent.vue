<script setup lang="ts">
// Imports
import BaseChartComponent from '@/components/common/BaseChartComponent.vue';
import type { ChartData } from 'chart.js';

// Selectors
const chartData: ChartData<'bar'> = {
  labels: ['5 ★', '4 ★', '3 ★', '2 ★', '1 ★'],
  datasets: [
    {
      data: [95, 32, 10, 3, 2],
      backgroundColor: ['#E8A020', '#F5B036', '#EAB308', '#F97316', '#EF4444'],
      borderRadius: 6,
    },
  ],
};
</script>

<template>
  <div
    class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-base md:text-lg font-bold text-stone-800 tracking-tight">
          Distribución de calificaciones
        </h2>
      </div>

      <span
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200"
      >
        <span>4.8</span>
        <span class="text-amber-500">★</span>
        <span class="text-stone-400 font-normal">(142 reseñas)</span>
      </span>
    </div>

    <!-- Chart Container -->
    <div class="w-full h-56 relative">
      <BaseChartComponent type="bar" :data="chartData" :horizontal="true" />
    </div>
  </div>
</template>
