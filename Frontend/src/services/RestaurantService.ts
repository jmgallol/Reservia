// Internal imports
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { ReviewService } from '@/services/ReviewService';
import axios from 'axios';

export class RestaurantService {
  private static readonly API_URL = 'http://localhost:3000/api/restaurants';

  static async getAll(): Promise<RestaurantInterface[]> {
    try {
      const { data } = await axios.get(this.API_URL);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getById(id: number): Promise<RestaurantInterface | undefined> {
    try {
      const { data } = await axios.get(`${this.API_URL}/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async getCities(): Promise<string[]> {
    try {
      const { data } = await axios.get(`${this.API_URL}/cities`);
      return data;
    } catch (error) {
      console.error(error);
      return ['Todas'];
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const { data } = await axios.get(`${this.API_URL}/categories`);
      return data;
    } catch (error) {
      console.error(error);
      return ['Todas'];
    }
  }

  static async filter(
    query: string = '',
    city: string = 'Todas',
    category: string = 'Todas',
  ): Promise<RestaurantInterface[]> {
    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (city) params.append('city', city);
      if (category) params.append('category', category);

      const { data } = await axios.get(`${this.API_URL}?${params.toString()}`);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static calculateAverageRating(restaurantId: number): number {
    const reviews = ReviewService.getByRestaurantId(restaurantId);
    if (reviews.length === 0) {
      return 4.8;
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }

  static async create(restaurant: Omit<RestaurantInterface, 'id'>): Promise<RestaurantInterface | undefined> {
    try {
      const { data } = await axios.post(this.API_URL, restaurant);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async update(restaurant: RestaurantInterface): Promise<RestaurantInterface | undefined> {
    try {
      const { data } = await axios.patch(`${this.API_URL}/${restaurant.id}`, restaurant);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.API_URL}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
}
