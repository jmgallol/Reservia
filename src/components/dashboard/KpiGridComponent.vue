<script setup lang="ts">
// External imports
import { AlertCircle, Calendar, Check, Star, TrendingDown, TrendingUp } from 'lucide-vue-next';

// Selectors
const kpiCards = [
  {
    id: 'total',
    label: 'Reservas totales',
    value: '412',
    trendText: '+12% vs mes ant.',
    isPositive: true,
    icon: Calendar,
  },
  {
    id: 'today',
    label: 'Confirmadas hoy',
    value: '18',
    trendText: '+3 nuevas',
    isPositive: true,
    icon: Check,
  },
  {
    id: 'pending',
    label: 'Pendientes',
    value: '7',
    trendText: 'requieren acción',
    isPositive: false,
    icon: AlertCircle,
  },
  {
    id: 'rating',
    label: 'Calificación',
    value: '4.8 ★',
    trendText: '+0.1 esta semana',
    isPositive: true,
    icon: Star,
  },
];
</script>

<template>
  <!-- KPI Metrics Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    <article
      v-for="card in kpiCards"
      :key="card.id"
      class="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow"
    >
      <!-- Top row: Icon + Trend indicator -->
      <div class="flex items-center justify-between">
        <div
          class="w-10 h-10 rounded-full bg-[#EEF5F1] text-[#1A3D2B] flex items-center justify-center shrink-0"
        >
          <component :is="card.icon" :size="18" />
        </div>

        <div
          class="flex items-center gap-0.5 text-xs font-semibold"
          :class="card.isPositive ? 'text-emerald-600' : 'text-[#C8552A]'"
        >
          <TrendingUp v-if="card.isPositive" :size="15" />
          <TrendingDown v-else :size="15" />
        </div>
      </div>

      <!-- Main value and labels -->
      <div class="mt-4">
        <p class="text-3xl font-extrabold text-stone-900 tracking-tight font-heading">
          {{ card.value }}
        </p>
        <p class="text-xs font-bold text-stone-700 mt-1">
          {{ card.label }}
        </p>
        <p class="text-[11px] text-stone-400 font-medium mt-0.5">
          {{ card.trendText }}
        </p>
      </div>
    </article>
  </div>
</template>
