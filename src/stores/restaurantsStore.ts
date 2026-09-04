import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';

export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurants = ref<RestaurantInterface[]>([]);

  return { restaurants };
});
