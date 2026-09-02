import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';

import { useRestaurantStore } from '@/stores/restaurantsStore';

export class RestaurantService {
  static getAll(): RestaurantInterface[] {
    const store = useRestaurantStore();
    return store.restaurants;
  }

  static getById(id: number): RestaurantInterface | undefined {
    const store = useRestaurantStore();
    return store.restaurants.find((restaurant) => restaurant.id === id);
  }

  static getByCategory(category: string): RestaurantInterface[] {
    const store = useRestaurantStore();
    if (!category || category === 'Todas') {
      return store.restaurants;
    }
    return store.restaurants.filter((r) => r.category.toLowerCase() === category.toLowerCase());
  }

  static create(restaurant: RestaurantInterface): RestaurantInterface {
    const store = useRestaurantStore();
    const nextId =
      store.restaurants.length > 0 ? Math.max(...store.restaurants.map((r) => r.id)) + 1 : 1;

    const newRestaurant: RestaurantInterface = {
      ...restaurant,
      id: nextId,
    };

    store.restaurants.push(newRestaurant);
    return newRestaurant;
  }

  static update(restaurant: RestaurantInterface): void {
    const store = useRestaurantStore();
    const index = store.restaurants.findIndex((r) => r.id === restaurant.id);
    if (index !== -1) {
      store.restaurants[index] = { ...restaurant };
    }
  }

  static delete(id: number): void {
    const store = useRestaurantStore();
    const index = store.restaurants.findIndex((r) => r.id === id);
    if (index !== -1) {
      store.restaurants.splice(index, 1);
    }
  }
}
