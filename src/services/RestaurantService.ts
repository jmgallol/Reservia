// Internal imports
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { ReviewService } from '@/services/ReviewService';
import { StringFormatUtil } from '@/utils/StringFormatUtil';
import { useRestaurantStore } from '@/stores/restaurantsStore';

export class RestaurantService {
  static getAll(): RestaurantInterface[] {
    return useRestaurantStore().restaurants;
  }

  static getById(id: number): RestaurantInterface | undefined {
    return useRestaurantStore().restaurants.find((restaurant) => restaurant.id === id);
  }

  static getCities(): string[] {
    const cityNames = useRestaurantStore().restaurants.map((restaurant) => restaurant.city);
    return ['Todas', ...Array.from(new Set(cityNames)).sort((a, b) => a.localeCompare(b))];
  }

  static getCategories(): string[] {
    const categoryNames = useRestaurantStore().restaurants.map((restaurant) => restaurant.category);
    return ['Todas', ...Array.from(new Set(categoryNames)).sort((a, b) => a.localeCompare(b))];
  }

  static filter(
    query: string = '',
    city: string = 'Todas',
    category: string = 'Todas',
  ): RestaurantInterface[] {
    const normalizedQuery = StringFormatUtil.normalizeSearchText(query);

    return useRestaurantStore().restaurants.filter((restaurant) => {
      const normalizedName = StringFormatUtil.normalizeSearchText(restaurant.name);
      const normalizedCity = StringFormatUtil.normalizeSearchText(restaurant.city);
      const normalizedCategory = StringFormatUtil.normalizeSearchText(restaurant.category);

      const matchesSearch =
        normalizedQuery === '' ||
        normalizedName.includes(normalizedQuery) ||
        normalizedCity.includes(normalizedQuery) ||
        normalizedCategory.includes(normalizedQuery);

      const matchesCity = city === 'Todas' || restaurant.city.toLowerCase() === city.toLowerCase();

      const matchesCategory =
        category === 'Todas' || restaurant.category.toLowerCase() === category.toLowerCase();

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
    const restaurants = useRestaurantStore().restaurants;
    const nextId = restaurants.length > 0 ? Math.max(...restaurants.map((r) => r.id)) + 1 : 1;

    const newRestaurant: RestaurantInterface = {
      ...restaurant,
      id: nextId,
    };

    useRestaurantStore().restaurants.push(newRestaurant);

    return newRestaurant;
  }

  static update(restaurant: RestaurantInterface): void {
    const restaurants = useRestaurantStore().restaurants;
    const index = restaurants.findIndex((r) => r.id === restaurant.id);
    const existing = restaurants[index];

    if (index !== -1 && existing) {
      restaurants[index] = { ...restaurant };
    }
  }

  static delete(id: number): void {
    const restaurants = useRestaurantStore().restaurants;
    const index = restaurants.findIndex((r) => r.id === id);
    if (index !== -1) {
      restaurants.splice(index, 1);
    }
  }
}
