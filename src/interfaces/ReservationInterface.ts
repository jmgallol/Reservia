export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ReservationInterface {
  id: number;
  reservationDate: string;
  reservationTime: string;
  numberOfPeople: number;
  status: ReservationStatus;
  specialRequest?: string;
  createdAt?: string;
  userId: number;
  restaurantId: number;
}
