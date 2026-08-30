export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ReservationInterface {
  id: number;
  restaurantId: number;
  userId: number;
  clientName?: string;
  clientEmail?: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
  specialRequest?: string;
}
