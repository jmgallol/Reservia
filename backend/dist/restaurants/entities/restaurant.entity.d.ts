import type { Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Reservation } from '../../reservations/entities/reservation.entity.js';
import { Review } from '../../reviews/entities/review.entity.js';
export declare class Restaurant {
    id: number;
    name: string;
    description: string;
    address: string;
    averageRating?: number;
    city: string;
    category: string;
    openingTime: string;
    closingTime: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    adminId: number;
    user: Relation<User>;
    reservations: Relation<Reservation[]>;
    reviews: Relation<Review[]>;
}
