// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export const useReviewStore = defineStore('review', () => {
  const reviews = ref<ReviewInterface[]>([]);

  return { reviews };
});
