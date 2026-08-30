<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';

import StarRatingComponent from '@/components/restaurant/StarRatingComponent.vue';

import { ReviewService } from '@/services/ReviewService';

import { DateFormatUtil } from '@/utils/DateFormatUtil';

// Props
interface Props {
  restaurantId: number;
}

const props = defineProps<Props>();

// Reactive state
const form = ref({
  comment: '',
  rating: 5,
  user: '',
});

const isSubmitting = ref(false);

// Computed
const reviews = computed(() => ReviewService.getReviewsByRestaurantId(props.restaurantId));

// Methods
function submitReview(): void {
  if (!form.value.comment.trim()) return;

  isSubmitting.value = true;
  ReviewService.createReview({
    id: 0,
    restaurantId: props.restaurantId,
    rating: Math.min(5, Math.max(1, form.value.rating)),
    comment: form.value.comment.trim(),
    user: form.value.user.trim() || '',
    status: 'approved',
  });
  form.value = { comment: '', rating: 5, user: '' };
  isSubmitting.value = false;
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold text-gray-800">Reseñas</h3>

    <!-- Review form -->
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Agregar reseña</h4>
      <form @submit.prevent="submitReview" class="space-y-3">
        <!-- Rating -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Calificación</label>
          <StarRatingComponent
            :rating="form.rating"
            :size="24"
            @update:rating="form.rating = $event"
          />
        </div>

        <!-- Comment -->
        <div>
          <label for="review-comment" class="block text-sm text-gray-600 mb-1">Comentario</label>
          <textarea
            id="review-comment"
            v-model="form.comment"
            rows="3"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Comparte tu experiencia..."
            required
          />
        </div>

        <!-- Author -->
        <div>
          <label for="review-author" class="block text-sm text-gray-600 mb-1"
            >Tu nombre (opcional)</label
          >
          <input
            id="review-author"
            v-model="form.user"
            type="text"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Nombre"
          />
        </div>

        <!-- Action -->
        <button
          type="submit"
          :disabled="isSubmitting || !form.comment.trim()"
          class="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Publicar reseña
        </button>
      </form>
    </div>

    <!-- Review list -->
    <ul class="space-y-4">
      <li
        v-for="review in reviews"
        :key="review.id"
        class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="font-medium text-gray-800">{{ review.user || 'Anónimo' }}</span>
          <StarRatingComponent :rating="review.rating" :size="16" :readonly="true" />
        </div>
        <p class="text-gray-600 text-sm whitespace-pre-wrap">{{ review.comment }}</p>
        <p v-if="review.createdAt" class="text-gray-400 text-xs mt-2">
          {{ DateFormatUtil.format(review.createdAt) }}
        </p>
      </li>
      <li v-if="reviews.length === 0" class="text-gray-500 text-sm py-4">
        Aún no hay reseñas. ¡Sé el primero en opinar!
      </li>
    </ul>
  </div>
</template>
