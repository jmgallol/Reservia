import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';

import { restaurantSeedData } from '@/seeders/RestaurantSeeder';
import { useRestaurantStore } from '@/stores/restaurantsStore';

export class RestaurantService {
  private static ensureInitialized(): void {
    const store = useRestaurantStore();
    if (store.restaurants.length === 0) {
      store.restaurants = [...restaurantSeedData];
    }
  }

  static getRestaurants(): RestaurantInterface[] {
    RestaurantService.ensureInitialized();
    const store = useRestaurantStore();
    return store.restaurants;
  }

  static getFeaturedRestaurants(limit: number): RestaurantInterface[] {
    RestaurantService.ensureInitialized();
    const store = useRestaurantStore();
    return store.restaurants.slice(0, limit);
  }

  static getRestaurantById(id: number): RestaurantInterface | undefined {
    RestaurantService.ensureInitialized();
    const store = useRestaurantStore();
    return store.restaurants.find((r) => r.id === id);
  }

  static getRestaurantsByCategory(category: string): RestaurantInterface[] {
    RestaurantService.ensureInitialized();
    const store = useRestaurantStore();
    if (!category || category === 'Todas') {
      return store.restaurants;
    }
    return store.restaurants.filter((r) => r.category.toLowerCase() === category.toLowerCase());
  }

  static createRestaurant(restaurant: RestaurantInterface): void {
    const store = useRestaurantStore();
    const nextId =
      store.restaurants.length > 0 ? Math.max(...store.restaurants.map((r) => r.id)) + 1 : 1;
    store.restaurants.push({
      ...restaurant,
      id: nextId,
    });
  }

  static updateRestaurant(restaurant: RestaurantInterface): void {
    const store = useRestaurantStore();
    const index = store.restaurants.findIndex((r) => r.id === restaurant.id);
    if (index !== -1) {
      store.restaurants[index] = {
        ...store.restaurants[index],
        ...restaurant,
      };
    }
  }

  static deleteRestaurant(id: number): void {
    const store = useRestaurantStore();
    const index = store.restaurants.findIndex((r) => r.id === id);
    if (index !== -1) {
      store.restaurants.splice(index, 1);
    }
  }
}
