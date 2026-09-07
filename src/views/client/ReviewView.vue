<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';

// Internal imports
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import StarRatingComponent from '@/components/restaurant/StarRatingComponent.vue';
import EditReviewModalComponent from '@/components/review/EditReviewModalComponent.vue';

import type { ReviewInterface } from '@/interfaces/ReviewInterface';

import { AuthService } from '@/services/AuthService';
import { RestaurantService } from '@/services/RestaurantService';
import { ReviewService } from '@/services/ReviewService';
import { DateFormatUtil } from '@/utils/DateFormatUtil';
import { StringFormatUtil } from '@/utils/StringFormatUtil';

// Reactive state
const showEditModal = ref(false);
const selectedReview = ref<ReviewInterface | null>(null);

// Computed
const currentUserReviews = computed<ReviewInterface[]>(() => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return [];

  return ReviewService.getByUserId(currentUser.id);
});

// Methods
function getRestaurantName(restaurantId: number): string {
  return RestaurantService.getById(restaurantId)?.name ?? 'Restaurante no encontrado';
}

function openEditModal(review: ReviewInterface): void {
  selectedReview.value = review;
  showEditModal.value = true;
}

function handleDeleteReview(review: ReviewInterface): void {
  const confirmed = confirm(`¿Eliminar tu reseña de ${getRestaurantName(review.restaurantId)}?`);
  if (!confirmed) return;

  ReviewService.delete(review.id);
}


</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Sidebar -->
    <SidebarComponent role="client" />

    <!-- Content column with persistent top header and scrollable body -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Header -->
      <HeaderComponent class="shrink-0" />

      <!-- Main Page Content -->
      <main class="flex-1 px-8 pb-24 overflow-y-auto">
        <div class="max-w-5xl mx-auto space-y-5">
          <section
            class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h2 class="text-lg font-bold text-stone-900 tracking-tight font-heading">
                Mis Reseñas
              </h2>
              <p class="text-stone-500 text-xs mt-1">
                Consulta y gestiona tus opiniones publicadas
              </p>
            </div>

            <span class="text-xs font-semibold text-stone-400">
              <strong class="text-stone-800">{{ currentUserReviews.length }}</strong> reseñas
            </span>
          </section>

          <div
            v-if="currentUserReviews.length === 0"
            class="bg-white rounded-2xl p-12 border border-stone-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-3"
          >
            <div
              class="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 text-xl font-bold"
            >
              ★
            </div>
            <h3 class="text-base font-bold text-stone-800">No tienes reseñas publicadas</h3>
            <p class="text-stone-500 text-xs max-w-sm">
              Las reseñas y calificaciones que realices en tus restaurantes visitados aparecerán en
              esta sección.
            </p>
          </div>

          <div v-else class="space-y-5">

            <article
              v-for="review in currentUserReviews"
              :key="review.id"
              class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-5"
            >
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold text-stone-400">
                    {{ DateFormatUtil.formatReviewDate(review.reviewDate) }}
                  </p>
                  <h3 class="mt-1 text-lg font-bold text-stone-900 font-heading">
                    {{ getRestaurantName(review.restaurantId) }}
                  </h3>
                </div>

                <span
                  v-if="review.status"
                  class="inline-flex w-fit items-center px-3 py-1 rounded-full bg-stone-100 text-xs font-medium text-stone-600"
                >
                  {{ StringFormatUtil.formatReviewStatus(review.status) }}
                </span>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <StarRatingComponent :rating="review.rating" :readonly="true" :size="18" />
                <span class="text-sm font-bold text-stone-700">{{ review.rating }}/5</span>
              </div>

              <p class="text-sm leading-relaxed text-stone-600">
                {{ review.comment }}
              </p>

              <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  class="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                  @click="openEditModal(review)"
                >
                  Editar
                </button>
                <button
                  type="button"
                  class="px-4 py-2 rounded-xl bg-red-50 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                  @click="handleDeleteReview(review)"
                >
                  Eliminar
                </button>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>

    <!-- Edit Review Modal -->
    <EditReviewModalComponent
      v-model="showEditModal"
      :review="selectedReview"
    />
  </div>
</template>
