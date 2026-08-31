import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';

export const useRestaurantStore = defineStore('restaurants', () => {
  // State
  const restaurants = ref<RestaurantInterface[]>([]);

  return {
    restaurants,
  };
});
