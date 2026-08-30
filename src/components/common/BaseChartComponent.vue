<script setup lang="ts">
// Imports
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import Chart from 'chart.js/auto';
import type { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';

// Props
interface Props {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  horizontal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
  horizontal: false,
});

// Variables
const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

// Methods
function getDefaultOptions(): ChartOptions {
  const isCircular = props.type === 'doughnut' || props.type === 'pie';

  const base: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: props.horizontal ? 'y' : 'x',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1C1917',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      },
    },
  };

  if (props.type === 'doughnut') {
    (base as Record<string, unknown>).cutout = '72%';
  }

  if (!isCircular) {
    base.scales = {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#78716C',
          font: { size: 11 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E7E5E4',
        },
        border: {
          dash: [3, 3],
        },
        ticks: {
          color: '#78716C',
          font: { size: 11 },
        },
      },
    };
  }

  return base;
}

function renderChart(): void {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  const defaultOptions = getDefaultOptions();

  const config: ChartConfiguration = {
    type: props.type,
    data: props.data,
    options: {
      ...defaultOptions,
      ...props.options,
      plugins: {
        ...defaultOptions.plugins,
        ...props.options?.plugins,
      },
      scales: {
        ...defaultOptions.scales,
        ...props.options?.scales,
      },
    },
  };

  chartInstance = new Chart(canvasRef.value, config);
}

// Watchers
watch(
  () => props.data,
  () => {
    renderChart();
  },
  { deep: true },
);

// Lifecycle
onMounted(() => {
  renderChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});
</script>

<template>
  <div class="relative w-full h-full min-h-[180px]">
    <canvas ref="canvasRef" />
  </div>
</template>
