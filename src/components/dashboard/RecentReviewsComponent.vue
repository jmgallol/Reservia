<script setup lang="ts">
// Imports
import { computed } from 'vue';

import { MessageSquareQuote } from 'lucide-vue-next';

import StarRatingComponent from '@/components/restaurant/StarRatingComponent.vue';

import { ReviewService } from '@/services/ReviewService';

import { DateFormatUtil } from '@/utils/DateFormatUtil';

// Computed
const recentReviews = computed(() => ReviewService.getReviews());
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-4 flex flex-col justify-between"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base md:text-lg font-bold text-stone-800 tracking-tight">
          Reseñas recientes
        </h2>
        <p class="text-stone-400 text-xs mt-0.5 font-medium">
          Últimas opiniones compartidas por los comensales
        </p>
      </div>

      <span
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"
      >
        <span>4.8</span>
        <span class="text-amber-500">★</span>
        <span class="text-stone-400 font-normal">promedio</span>
      </span>
    </div>

    <!-- Reviews List -->
    <div class="divide-y divide-stone-100">
      <article
        v-for="review in recentReviews"
        :key="review.id"
        class="py-3.5 first:pt-0 last:pb-0 space-y-2 hover:bg-stone-50/50 rounded-xl px-2 -mx-2 transition-colors"
      >
        <!-- Author + Rating + Date Row -->
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2 min-w-0">
            <div
              class="w-7 h-7 rounded-full bg-[#FAF8F4] border border-stone-200 text-[#1A3D2B] font-bold text-xs flex items-center justify-center shrink-0"
            >
              {{ review.user ? review.user.charAt(0) : 'U' }}
            </div>
            <h3 class="font-semibold text-stone-900 text-xs truncate">
              {{ review.user }}
            </h3>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <StarRatingComponent :rating="review.rating" :readonly="true" :size="13" />
            <span v-if="review.createdAt" class="text-[11px] text-stone-400">
              {{ DateFormatUtil.format(review.createdAt) }}
            </span>
          </div>
        </div>

        <!-- Comment -->
        <div class="flex items-start gap-2 pl-9">
          <MessageSquareQuote class="w-3.5 h-3.5 text-stone-300 shrink-0 mt-0.5" />
          <p class="text-xs text-stone-600 line-clamp-2 italic">"{{ review.comment }}"</p>
        </div>
      </article>
    </div>
  </div>
</template>
