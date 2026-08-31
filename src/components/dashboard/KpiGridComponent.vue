<script setup lang="ts">
// Imports
import {
  BookOpen,
  Calendar,
  Check,
  Clock,
  MessageSquare,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  X,
} from 'lucide-vue-next';

// Selectors
const kpiItems = [
  {
    id: 'total-reservations',
    label: 'Total reservas',
    value: '412',
    trend: '+12%',
    isPositive: true,
    icon: Calendar,
  },
  {
    id: 'today-reservations',
    label: 'Reservas hoy',
    value: '8',
    trend: '+3',
    isPositive: true,
    icon: Clock,
  },
  {
    id: 'pending-reservations',
    label: 'Pendientes',
    value: '18',
    trend: '+2',
    isPositive: false,
    icon: Clock,
  },
  {
    id: 'confirmed-reservations',
    label: 'Confirmadas',
    value: '314',
    trend: '+5%',
    isPositive: true,
    icon: Check,
  },
  {
    id: 'cancelled-reservations',
    label: 'Canceladas',
    value: '48',
    trend: '-3%',
    isPositive: false,
    icon: X,
  },
  {
    id: 'completed-reservations',
    label: 'Completadas',
    value: '346',
    trend: '+8%',
    isPositive: true,
    icon: BookOpen,
  },
  {
    id: 'attended-clients',
    label: 'Clientes atendidos',
    value: '1,124',
    trend: '+15%',
    isPositive: true,
    icon: Users,
  },
  {
    id: 'average-rating',
    label: 'Calificación prom.',
    value: '4.8',
    trend: '+0.1',
    isPositive: true,
    icon: Star,
    isRating: true,
  },
  {
    id: 'total-reviews',
    label: 'Total reseñas',
    value: '142',
    trend: '+9',
    isPositive: true,
    icon: MessageSquare,
  },
];
</script>

<template>
  <!-- 9 KPI Cards Responsive Grid -->
  <section class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 mb-8">
    <div
      v-for="item in kpiItems"
      :key="item.id"
      class="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <!-- Top Row: Icon + Trend indicator -->
      <div class="flex items-center justify-between gap-1 mb-3">
        <div
          class="w-7 h-7 rounded-lg bg-[#FAF8F4] flex items-center justify-center text-stone-600"
        >
          <component :is="item.icon" class="w-3.5 h-3.5" />
        </div>

        <div
          :class="[
            'flex items-center gap-0.5 text-[11px] font-bold tracking-tight',
            item.isPositive ? 'text-emerald-600' : 'text-[#C8552A]',
          ]"
        >
          <component :is="item.isPositive ? TrendingUp : TrendingDown" class="w-3 h-3 shrink-0" />
          <span>{{ item.trend }}</span>
        </div>
      </div>

      <!-- Value & Subtitle -->
      <div>
        <div class="flex items-baseline gap-1">
          <span class="text-xl font-extrabold text-stone-900 tracking-tight">
            {{ item.value }}
          </span>
          <span v-if="item.isRating" class="text-xs text-stone-900 font-bold">★</span>
        </div>
        <p class="text-stone-400 text-xs mt-0.5 leading-snug font-medium line-clamp-1">
          {{ item.label }}
        </p>
      </div>
    </div>
  </section>
</template>
