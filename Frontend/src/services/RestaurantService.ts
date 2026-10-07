// Internal imports
import type { CreateRestaurantDTO } from '@/dtos/CreateRestaurantDTO';
import type { UpdateRestaurantDTO } from '@/dtos/UpdateRestaurantDTO';
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import axios from 'axios';

export class RestaurantService {
  private static readonly API_URL = `${import.meta.env.VITE_API_URL}/restaurants`;

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

  static async create(dto: CreateRestaurantDTO): Promise<RestaurantInterface | undefined> {
    try {
      const { data } = await axios.post(this.API_URL, dto);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async update(id: number, dto: UpdateRestaurantDTO): Promise<RestaurantInterface | undefined> {
    try {
      const { data } = await axios.patch(`${this.API_URL}/${id}`, dto);
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

  static calculateAverageRating(restaurant: RestaurantInterface): number {
    return restaurant.averageRating ?? 4.8;
  }
}
