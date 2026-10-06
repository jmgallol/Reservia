// Internal imports
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';

export type CreateRestaurantDTO = Omit<RestaurantInterface, 'id' | 'averageRating'>;
