<script setup lang="ts">
// External imports
import Chart from 'chart.js/auto';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Internal imports
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import StarRatingComponent from '@/components/restaurant/StarRatingComponent.vue';

import type { ReviewInterface } from '@/interfaces/ReviewInterface';

import { AuthService } from '@/services/AuthService';
import { RestaurantService } from '@/services/RestaurantService';
import { ReviewService } from '@/services/ReviewService';

// Reactive state
const showEditModal = ref(false);
const selectedReview = ref<ReviewInterface | null>(null);
const editRating = ref(1);
const editComment = ref('');
const editErrorMessage = ref('');
const ratingChartRef = ref<HTMLCanvasElement | null>(null);

// Variables
let ratingChartInstance: Chart | null = null;
const ratingChartLabels = ['1★', '2★', '3★', '4★', '5★'];

// Computed
const currentUserReviews = computed<ReviewInterface[]>(() => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return [];

  return ReviewService.getAll().filter((review) => review.userId === currentUser.id);
});

const ratingDistribution = computed<number[]>(() =>
  [1, 2, 3, 4, 5].map(
    (rating) => currentUserReviews.value.filter((review) => review.rating === rating).length,
  ),
);

// Methods
function getRestaurantName(restaurantId: number): string {
  return RestaurantService.getById(restaurantId)?.name ?? 'Restaurante no encontrado';
}

function formatReviewDate(reviewDate?: string): string {
  if (!reviewDate) return '';

  const date = new Date(reviewDate);
  if (Number.isNaN(date.getTime())) return reviewDate;

  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function formatReviewStatus(status?: string): string {
  const labels: Record<string, string> = {
    approved: 'Aprobada',
    pending: 'Pendiente',
    rejected: 'Rechazada',
  };

  return status ? labels[status] ?? status : '';
}

function openEditModal(review: ReviewInterface): void {
  selectedReview.value = review;
  editRating.value = review.rating;
  editComment.value = review.comment;
  editErrorMessage.value = '';
  showEditModal.value = true;
}

function closeEditModal(): void {
  showEditModal.value = false;
  selectedReview.value = null;
  editErrorMessage.value = '';
}

function isEditFormValid(): boolean {
  return editRating.value >= 1 && editRating.value <= 5 && editComment.value.trim() !== '';
}

function handleSaveEdit(): void {
  if (!selectedReview.value) return;

  if (!isEditFormValid()) {
    editErrorMessage.value = 'Selecciona una calificación entre 1 y 5 y escribe un comentario.';
    return;
  }

  ReviewService.update({
    ...selectedReview.value,
    rating: editRating.value,
    comment: editComment.value.trim(),
  });

  closeEditModal();
}

function handleDeleteReview(review: ReviewInterface): void {
  const confirmed = confirm(`¿Eliminar tu reseña de ${getRestaurantName(review.restaurantId)}?`);
  if (!confirmed) return;

  ReviewService.delete(review.id);
}

function renderRatingChart(): void {
  if (!ratingChartRef.value) return;

  if (ratingChartInstance) {
    ratingChartInstance.destroy();
  }

  ratingChartInstance = new Chart(ratingChartRef.value, {
    type: 'bar',
    data: {
      labels: ratingChartLabels,
      datasets: [
        {
          backgroundColor: '#C8552A',
          borderRadius: 8,
          data: ratingDistribution.value,
          label: 'Reseñas',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    },
  });
}

// Watchers
watch(ratingDistribution, () => {
  renderRatingChart();
});

// Lifecycle
onMounted(() => {
  renderRatingChart();
});

onBeforeUnmount(() => {
  if (ratingChartInstance) {
    ratingChartInstance.destroy();
  }
});
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
            <section class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6">
              <h3 class="text-base font-bold text-stone-900 font-heading">
                Distribución de calificaciones
              </h3>
              <div class="mt-4 h-64">
                <canvas ref="ratingChartRef" />
              </div>
            </section>

            <article
              v-for="review in currentUserReviews"
              :key="review.id"
              class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-5"
            >
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold text-stone-400">
                    {{ formatReviewDate(review.reviewDate) }}
                  </p>
                  <h3 class="mt-1 text-lg font-bold text-stone-900 font-heading">
                    {{ getRestaurantName(review.restaurantId) }}
                  </h3>
                </div>

                <span
                  v-if="review.status"
                  class="inline-flex w-fit items-center px-3 py-1 rounded-full bg-stone-100 text-xs font-medium text-stone-600"
                >
                  {{ formatReviewStatus(review.status) }}
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

    <BaseModalComponent v-model="showEditModal">
      <form class="space-y-5" @submit.prevent="handleSaveEdit">
        <div>
          <h2 class="text-lg font-bold text-stone-900 font-heading">Editar reseña</h2>
          <p class="mt-1 text-xs text-stone-500">
            Actualiza tu calificación y comentario.
          </p>
        </div>

        <p
          v-if="editErrorMessage"
          class="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
        >
          {{ editErrorMessage }}
        </p>

        <div class="space-y-2">
          <label class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            Calificación
          </label>
          <div class="flex flex-wrap items-center gap-3">
            <StarRatingComponent v-model:rating="editRating" :size="22" />
            <span class="text-sm font-bold text-stone-700">{{ editRating }}/5</span>
          </div>
        </div>

        <div class="space-y-1.5">
          <label
            for="edit-review-comment"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Comentario
          </label>
          <textarea
            id="edit-review-comment"
            v-model="editComment"
            rows="4"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors resize-none"
          />
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            @click="closeEditModal"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded-xl bg-[#C8552A] text-sm font-semibold text-white hover:bg-[#b54a22] transition-colors cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </form>
    </BaseModalComponent>
  </div>
</template>
