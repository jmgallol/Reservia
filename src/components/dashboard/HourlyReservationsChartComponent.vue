<script setup lang="ts">
// Imports
import BaseChartComponent from '@/components/common/BaseChartComponent.vue';
import type { ChartData } from 'chart.js';

// Selectors
const chartData: ChartData<'bar'> = {
  labels: ['12:00', '13:00', '14:00', '15:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
  datasets: [
    {
      data: [14, 28, 42, 18, 12, 35, 68, 54, 22],
      backgroundColor: '#1A3D2B',
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
          Horarios de mayor demanda
        </h2>
      </div>
    </div>

    <!-- Chart Container -->
    <div class="w-full h-56 relative">
      <BaseChartComponent type="bar" :data="chartData" />
    </div>
  </div>
</template>
