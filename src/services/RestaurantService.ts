// Internal imports
import type { FilterRestaurantsDTO } from '@/dtos/FilterRestaurantsDTO';
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { ReviewService } from '@/services/ReviewService';
import { useRestaurantStore } from '@/stores/restaurantsStore';
import { StringFormatUtil } from '@/utils/StringFormatUtil';

export class RestaurantService {
  static getAll(): RestaurantInterface[] {
    const store = useRestaurantStore();
    return store.restaurants;
  }

  static getById(id: number): RestaurantInterface | undefined {
    const store = useRestaurantStore();
    return store.restaurants.find((restaurant) => restaurant.id === id);
  }

  static getCities(): string[] {
    const store = useRestaurantStore();
    const cityNames = store.restaurants.map((restaurant) => restaurant.city);
    return ['Todas', ...Array.from(new Set(cityNames)).sort((a, b) => a.localeCompare(b))];
  }

  static getCategories(): string[] {
    const store = useRestaurantStore();
    const categoryNames = store.restaurants.map((restaurant) => restaurant.category);
    return ['Todas', ...Array.from(new Set(categoryNames)).sort((a, b) => a.localeCompare(b))];
  }

  static filter(dto: FilterRestaurantsDTO): RestaurantInterface[] {
    const store = useRestaurantStore();
    const normalizedQuery = StringFormatUtil.normalizeSearchText(dto.query);

    return store.restaurants.filter((restaurant) => {
      const normalizedName = StringFormatUtil.normalizeSearchText(restaurant.name);
      const normalizedCity = StringFormatUtil.normalizeSearchText(restaurant.city);
      const normalizedCategory = StringFormatUtil.normalizeSearchText(restaurant.category);

      const matchesSearch =
        normalizedQuery === '' ||
        normalizedName.includes(normalizedQuery) ||
        normalizedCity.includes(normalizedQuery) ||
        normalizedCategory.includes(normalizedQuery);

      const matchesCity =
        dto.city === 'Todas' || restaurant.city.toLowerCase() === dto.city.toLowerCase();

      const matchesCategory =
        dto.category === 'Todas' ||
        restaurant.category.toLowerCase() === dto.category.toLowerCase();

      return matchesSearch && matchesCity && matchesCategory;
    });
  }

  static calculateAverageRating(restaurantId: number): number {
    const reviews = ReviewService.getByRestaurantId(restaurantId);
    if (reviews.length === 0) {
      return 4.8;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
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
