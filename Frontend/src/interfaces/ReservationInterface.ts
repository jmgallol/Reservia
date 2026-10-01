import type { UserInterface } from './UserInterface';
import type { RestaurantInterface } from './RestaurantInterface';

export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ReservationInterface {
  id: number;
  reservationDate: string;
  reservationTime: string;
  numberOfPeople: number;
  status: ReservationStatus;
  specialRequest?: string;
  userId: number;
  restaurantId: number;
  user?: UserInterface;
  restaurant?: RestaurantInterface;
}
