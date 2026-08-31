<script setup lang="ts">
// Imports
import { computed } from 'vue';

import { Calendar, Clock, Users } from 'lucide-vue-next';

import StatusBadgeComponent from '@/components/common/StatusBadgeComponent.vue';

import { ReservationService } from '@/services/ReservationService';

// Computed
const upcomingReservations = computed(() => ReservationService.getUpcomingReservations());
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-4 flex flex-col justify-between"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base md:text-lg font-bold text-stone-800 tracking-tight">
          Reservas próximas
        </h2>
        <p class="text-stone-400 text-xs mt-0.5 font-medium">
          Agenda inmediata para el servicio de hoy y mañana
        </p>
      </div>

      <span
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
      >
        <Calendar class="w-3 h-3" />
        <span>{{ upcomingReservations.length }} pendientes</span>
      </span>
    </div>

    <!-- Upcoming List -->
    <div class="divide-y divide-stone-100">
      <article
        v-for="reservation in upcomingReservations"
        :key="reservation.id"
        class="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 hover:bg-stone-50/50 rounded-xl px-2 -mx-2 transition-colors"
      >
        <!-- Left: Time + Client Info -->
        <div class="flex items-start gap-3 min-w-0">
          <div
            class="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-stone-200 text-[#1A3D2B] flex flex-col items-center justify-center shrink-0"
          >
            <Clock class="w-3 h-3 text-[#C8552A]" />
            <span class="text-[10px] font-bold text-stone-700 mt-0.5 leading-none">
              {{ reservation.time }}
            </span>
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-stone-900 text-sm truncate">
                {{ reservation.clientName }}
              </h3>
              <span
                class="text-[11px] font-medium text-[#C8552A] bg-amber-50 px-1.5 py-0.5 rounded"
              >
                {{ reservation.date }}
              </span>
            </div>

            <div class="flex items-center gap-3 text-xs text-stone-500 mt-1">
              <span class="inline-flex items-center gap-1">
                <Users class="w-3 h-3 text-stone-400" />
                {{ reservation.guests }} personas
              </span>
              <span v-if="reservation.specialRequest" class="truncate text-stone-400 text-[11px]">
                · {{ reservation.specialRequest }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: Status Badge -->
        <div class="shrink-0">
          <StatusBadgeComponent :status="reservation.status" />
        </div>
      </article>
    </div>
  </div>
</template>
