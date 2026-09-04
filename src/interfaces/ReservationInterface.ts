export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ReservationInterface {
  id: number;
  date: string; // Diagram equivalent: reservationDate
  time: string; // Diagram equivalent: reservationTime
  guests: number; // Diagram equivalent: numberOfPeople
  status: ReservationStatus;
  specialRequest?: string;
  createdAt?: string;
  clientName?: string;
  clientEmail?: string;
  // Primitive relations (Foreign keys)
  userId: number; // Diagram equivalent: user: User (FK relation)
  restaurantId: number; // Diagram equivalent: restaurant: Restaurant (FK relation)
}
