export class CreateReservationDto {
  date: string;
  time: string;
  numberOfPeople: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialRequest?: string;
  userId: number;
  restaurantId: number;
}
