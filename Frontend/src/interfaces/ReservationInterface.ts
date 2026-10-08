import type { RestaurantInterface } from './RestaurantInterface';
import type { UserInterface } from './UserInterface';

export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ReservationInterface {
  id: number;
  date: string;
  time: string;
  numberOfPeople: number;
  status: ReservationStatus;
  specialRequest?: string;
  userId: number;
  restaurantId: number;
  user?: UserInterface;
  restaurant?: RestaurantInterface;
}
