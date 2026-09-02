import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { restaurantSeedData } from '@/seeders/RestaurantSeeder';

export const useRestaurantStore = defineStore('restaurants', () => {
  const restaurants = ref<RestaurantInterface[]>([...restaurantSeedData]);

  return {
    restaurants,
  };
});
