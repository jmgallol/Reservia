<script setup lang="ts">
// Imports
import BaseChartComponent from '@/components/common/BaseChartComponent.vue';
import type { ChartData } from 'chart.js';

// Selectors
const chartData: ChartData<'bar'> = {
  labels: ['Lun 21', 'Mar 22', 'Mié 23', 'Jue 24', 'Vie 25', 'Sáb 26', 'Dom 27'],
  datasets: [
    {
      data: [38, 45, 52, 60, 110, 145, 120],
      backgroundColor: '#C8552A',
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
          Personas por fecha
        </h2>
      </div>
    </div>

    <!-- Chart Container -->
    <div class="w-full h-56 relative">
      <BaseChartComponent type="bar" :data="chartData" />
    </div>
  </div>
</template>
