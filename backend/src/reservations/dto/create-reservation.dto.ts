export class CreateReservationDto {
    reservationDate: string;
    reservationTime: string;
    numberOfPeople: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    specialRequest?: string;
    userId: number;
    restaurantId: number;
}