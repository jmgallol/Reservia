<script setup lang="ts">
// External imports
import { AlertCircle, Calendar, Check, Star } from 'lucide-vue-next';
import { computed } from 'vue';

// Internal imports
import { ReservationService } from '@/services/ReservationService';
import { ReviewService } from '@/services/ReviewService';

// Computed
const kpiCards = computed(() => {
  const reservations = ReservationService.getAll();
  const reviews = ReviewService.getAll();

  const total = reservations.length;
  const confirmed = reservations.filter((r) => r.status === 'confirmed').length;
  const pending = reservations.filter((r) => r.status === 'pending').length;
  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return [
    {
      id: 'total',
      label: 'Reservas totales',
      value: String(total),
      trendText: 'Registradas en el sistema',
      icon: Calendar,
    },
    {
      id: 'confirmed',
      label: 'Confirmadas',
      value: String(confirmed),
      trendText: 'Listas para atender',
      icon: Check,
    },
    {
      id: 'pending',
      label: 'Pendientes',
      value: String(pending),
      trendText: 'Requieren confirmación',
      icon: AlertCircle,
    },
    {
      id: 'rating',
      label: 'Calificación',
      value: `${avgRating} ★`,
      trendText: 'Opiniones recibidas',
      icon: Star,
    },
  ];
});
</script>

<template>
  <!-- KPI Metrics Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    <article
      v-for="card in kpiCards"
      :key="card.id"
      class="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow"
    >
      <!-- Top row: Icon -->
      <div class="flex items-center justify-between">
        <div
          class="w-10 h-10 rounded-full bg-[#EEF5F1] text-[#1A3D2B] flex items-center justify-center shrink-0"
        >
          <component :is="card.icon" :size="18" />
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
