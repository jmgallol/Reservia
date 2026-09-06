<script setup lang="ts">
// External imports
import Chart from 'chart.js/auto';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Props
interface Props {
  title: string;
  subtitle?: string;
  labels: string[];
  data: number[];
  colors: string[];
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: undefined,
});

// Variables
let chartInstance: Chart | null = null;

// Reactive state
const chartCanvasRef = ref<HTMLCanvasElement | null>(null);

// Methods
function renderChart(): void {
  if (!chartCanvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvasRef.value, {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [
        {
          data: props.data,
          backgroundColor: props.colors,
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

// Watchers
watch(
  () => [...props.data],
  () => {
    renderChart();
  },
);

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
  <article class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-4">
    <!-- Header -->
    <div>
      <h3 class="text-base font-bold text-stone-900 font-heading tracking-tight">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="text-xs text-stone-400 font-medium mt-0.5">
        {{ subtitle }}
      </p>
    </div>

    <!-- Chart -->
    <div class="relative w-full aspect-square max-w-[220px] mx-auto">
      <canvas ref="chartCanvasRef" />
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2">
      <div
        v-for="(label, index) in labels"
        :key="label"
        class="flex items-center gap-1.5"
      >
        <span
          class="w-2.5 h-2.5 rounded-sm shrink-0"
          :style="{ backgroundColor: colors[index] }"
        />
        <span class="text-[11px] font-medium text-stone-500">{{ label }}</span>
      </div>
    </div>
  </article>
</template>
