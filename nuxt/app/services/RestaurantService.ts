// Internal imports
import type { RestaurantInterface } from '#shared/interfaces/RestaurantInterface';

export class RestaurantService {
  private static readonly API_URL = '/api/restaurants';

  static getAll(): Promise<RestaurantInterface[]> {
    return $fetch<RestaurantInterface[]>(this.API_URL);
  }

  static getById(id: number): Promise<RestaurantInterface> {
    return $fetch<RestaurantInterface>(`${this.API_URL}/${id}`);
  }
}
