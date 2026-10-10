// Internal imports
import type { CreateRestaurantDTO } from '@/dtos/CreateRestaurantDTO';
import type { UpdateRestaurantDTO } from '@/dtos/UpdateRestaurantDTO';
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { BaseService } from '@/services/BaseService';

export class RestaurantService extends BaseService {
  private static readonly API_URL = `${import.meta.env.VITE_API_URL}/restaurants`;

  static getAll(): Promise<RestaurantInterface[]> {
    return this.makeRequest(this.API_URL);
  }

  static getById(id: number): Promise<RestaurantInterface> {
    return this.makeRequest(`${this.API_URL}/${id}`);
  }

  static getCities(): Promise<string[]> {
    return this.makeRequest(`${this.API_URL}/cities`);
  }

  static getCategories(): Promise<string[]> {
    return this.makeRequest(`${this.API_URL}/categories`);
  }

  static filter(
    query: string = '',
    city: string = 'Todas',
    category: string = 'Todas',
  ): Promise<RestaurantInterface[]> {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (city && city !== 'Todas') params.append('city', city);
    if (category && category !== 'Todas') params.append('category', category);

    return this.makeRequest(`${this.API_URL}?${params.toString()}`);
  }

  static create(dto: CreateRestaurantDTO): Promise<RestaurantInterface> {
    return this.makeRequest(this.API_URL, false, 'post', dto);
  }

  static update(id: number, dto: UpdateRestaurantDTO): Promise<RestaurantInterface> {
    return this.makeRequest(`${this.API_URL}/${id}`, false, 'patch', dto);
  }

  static delete(id: number): Promise<void> {
    return this.makeRequest(`${this.API_URL}/${id}`, false, 'delete');
  }

  static calculateAverageRating(restaurant: RestaurantInterface): number {
    return restaurant.averageRating ?? 5.0;
  }
}
