import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { reviewSeedData } from '@/seeders/ReviewSeeder';

export const useReviewStore = defineStore('review', () => {
  const reviews = ref<ReviewInterface[]>([...reviewSeedData]);

  return { reviews };
});
