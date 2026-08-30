<script setup lang="ts">
// Imports
import BaseChartComponent from '@/components/common/BaseChartComponent.vue';
import type { ChartData } from 'chart.js';

// Selectors
const chartLabels = ['Confirmadas', 'Canceladas', 'Completadas', 'Pendientes'];
const chartValues = [314, 48, 346, 18];
const chartColors = ['#1A3D2B', '#C8552A', '#7AAD8C', '#E8A020'];

const legendItems = [
  { label: 'Confirmadas', value: 314, color: '#1A3D2B' },
  { label: 'Pendientes', value: 18, color: '#E8A020' },
  { label: 'Completadas', value: 346, color: '#7AAD8C' },
  { label: 'Canceladas', value: 48, color: '#C8552A' },
];

const totalReservations = chartValues.reduce((sum, val) => sum + val, 0);

const donutData: ChartData<'doughnut'> = {
  labels: chartLabels,
  datasets: [
    {
      data: chartValues,
      backgroundColor: chartColors,
      hoverBackgroundColor: ['#234E38', '#D8683D', '#8DBCA0', '#F5B036'],
      borderWidth: 3,
      borderColor: '#FFFFFF',
      hoverOffset: 4,
    },
  ],
};
</script>

<template>
  <div
    class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
  >
    <!-- Header -->
    <div class="mb-2">
      <h2 class="text-base md:text-lg font-bold text-stone-800 tracking-tight">
        Estado de reservas
      </h2>
    </div>

    <!-- Donut Chart Container with Center Summary -->
    <div class="relative w-full h-44 my-2 flex items-center justify-center">
      <BaseChartComponent type="doughnut" :data="donutData" />

      <!-- Center Text inside Donut Hole -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
      >
        <span class="text-xl font-extrabold text-stone-900 tracking-tight leading-none">
          {{ totalReservations }}
        </span>
        <span class="text-[11px] font-medium text-stone-400 mt-0.5"> Total </span>
      </div>
    </div>

    <!-- Legend matching mockup layout -->
    <div class="grid grid-cols-2 gap-x-3 gap-y-2 pt-4 border-t border-stone-100 text-xs">
      <div
        v-for="item in legendItems"
        :key="item.label"
        class="flex items-center gap-2 py-1 px-1.5"
      >
        <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: item.color }" />
        <span class="text-stone-700 font-medium truncate">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
