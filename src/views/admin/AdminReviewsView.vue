<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';

// Internal imports
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { AuthService } from '@/services/AuthService';
import { DateFormatUtil } from '@/utils/DateFormatUtil';
import { ReviewService } from '@/services/ReviewService';
import { StringFormatUtil } from '@/utils/StringFormatUtil';
import { UserService } from '@/services/UserService';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import StarRatingComponent from '@/components/common/StarRatingComponent.vue';

type RatingFilter = 'Todas' | '5' | '4' | '3' | '2' | '1';

// Reactive variables
const selectedRating = ref<RatingFilter>('Todas');

// Selectors
const ratingOptions: { value: RatingFilter; label: string }[] = [
  { value: 'Todas', label: 'Todas' },
  { value: '5', label: '5 ★' },
  { value: '4', label: '4 ★' },
  { value: '3', label: '3 ★' },
  { value: '2', label: '2 ★' },
  { value: '1', label: '1 ★' },
];

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());

const restaurantReviews = computed<ReviewInterface[]>(() => {
  if (!currentUser.value?.restaurantId) return [];
  return ReviewService.getByRestaurantId(currentUser.value.restaurantId);
});

const filteredReviews = computed<ReviewInterface[]>(() => {
  if (selectedRating.value === 'Todas') return restaurantReviews.value;
  const rating = Number(selectedRating.value);
  return restaurantReviews.value.filter((review) => review.rating === rating);
});

const averageRating = computed<number>(() => {
  if (!currentUser.value?.restaurantId) return 0;
  return ReviewService.getAverageRating(currentUser.value.restaurantId);
});

const totalReviews = computed<number>(() => restaurantReviews.value.length);

// Methods
function getClientName(userId: number): string {
  return UserService.getNameById(userId);
}

function getClientInitial(userId: number): string {
  const name = UserService.getNameById(userId);
  return StringFormatUtil.getInitials(name).charAt(0);
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Sidebar -->
    <SidebarComponent role="admin" />

    <!-- Content column with persistent top header and scrollable body -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Header -->
      <HeaderComponent class="shrink-0" />

      <!-- Main Page Content -->
      <main class="flex-1 px-8 pb-20 overflow-y-auto">
        <div class="max-w-7xl mx-auto space-y-6">
          <!-- Filters -->
          <div class="flex gap-4 items-stretch">
            <div
              class="flex-1 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div class="flex flex-wrap items-center gap-6">
                <div class="space-y-1">
                  <label
                    for="rating-select"
                    class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                  >
                    CALIFICACIÓN
                  </label>
                  <select
                    id="rating-select"
                    v-model="selectedRating"
                    class="px-3.5 py-2 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none cursor-pointer hover:border-stone-400 transition-colors"
                  >
                    <option
                      v-for="option in ratingOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>

              <span class="text-xs font-semibold text-stone-400">
                <strong class="text-stone-800">{{ filteredReviews.length }}</strong> reseñas
              </span>
            </div>

            <!-- Summary Card -->
            <article
              class="bg-white rounded-2xl border border-stone-200/80 shadow-xs px-8 py-4 shrink-0"
            >
              <div class="flex items-center gap-4">
                <p class="text-3xl font-bold text-stone-900 font-heading">
                  {{ averageRating }}
                </p>
                <div class="space-y-1">
                  <StarRatingComponent :rating="averageRating" :readonly="true" :size="18" />
                  <p class="text-[11px] text-stone-400 font-medium">
                    {{ totalReviews }} reseñas totales
                  </p>
                </div>
              </div>
            </article>
          </div>

          <!-- Data Table -->
          <div class="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-stone-100">
                  <th
                    class="px-6 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                  >
                    Cliente
                  </th>
                  <th
                    class="px-4 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                  >
                    Calificación
                  </th>
                  <th
                    class="px-4 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                  >
                    Comentario
                  </th>
                  <th
                    class="px-4 py-4 text-[11px] font-bold text-stone-500 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="review in filteredReviews"
                  :key="review.id"
                  class="border-b border-stone-50 last:border-b-0 hover:bg-stone-50/50 transition-colors"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-9 h-9 rounded-full bg-[#1E3A2B] text-white flex items-center justify-center text-xs font-bold shrink-0"
                      >
                        {{ getClientInitial(review.userId) }}
                      </div>
                      <p class="text-sm font-semibold text-stone-800 leading-tight">
                        {{ getClientName(review.userId) }}
                      </p>
                    </div>
                  </td>

                  <td class="px-4 py-4">
                    <StarRatingComponent :rating="review.rating" :readonly="true" :size="16" />
                  </td>

                  <td class="px-4 py-4 max-w-xs">
                    <p class="text-sm text-stone-600 line-clamp-2">
                      {{ review.comment }}
                    </p>
                  </td>

                  <td class="px-4 py-4 text-sm text-stone-700 font-medium whitespace-nowrap">
                    {{ DateFormatUtil.formatShortDate(review.reviewDate) }}
                  </td>
                </tr>

                <tr v-if="filteredReviews.length === 0">
                  <td colspan="4" class="px-6 py-12 text-center">
                    <p class="text-sm text-stone-400 font-medium">
                      No se encontraron reseñas con el filtro seleccionado.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
