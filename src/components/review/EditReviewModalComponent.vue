<script setup lang="ts">
// External imports
import { ref, watch } from 'vue';

// Internal imports
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import StarRatingComponent from '@/components/restaurant/StarRatingComponent.vue';

import type { ReviewInterface } from '@/interfaces/ReviewInterface';

import { ReviewService } from '@/services/ReviewService';

// Props & Emits
const props = defineProps<{
  modelValue: boolean;
  review: ReviewInterface | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  saved: [];
}>();

// Reactive state
const editRating = ref(1);
const editComment = ref('');
const editErrorMessage = ref('');

// Watchers
watch(
  () => props.review,
  (review) => {
    if (!review) return;

    editRating.value = review.rating;
    editComment.value = review.comment;
    editErrorMessage.value = '';
  },
);

// Methods
function closeModal(): void {
  emit('update:modelValue', false);
  editErrorMessage.value = '';
}

function isFormValid(): boolean {
  return editRating.value >= 1 && editRating.value <= 5 && editComment.value.trim() !== '';
}

function handleSave(): void {
  if (!props.review) return;

  if (!isFormValid()) {
    editErrorMessage.value = 'Selecciona una calificación entre 1 y 5 y escribe un comentario.';
    return;
  }

  ReviewService.update({
    ...props.review,
    rating: editRating.value,
    comment: editComment.value.trim(),
  });

  emit('saved');
  closeModal();
}
</script>

<template>
  <BaseModalComponent :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <form class="space-y-5" @submit.prevent="handleSave">
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
          @click="closeModal"
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
</template>
