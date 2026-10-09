import type { Relation } from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity.js';
import { Reservation } from '../../reservations/entities/reservation.entity.js';
import { Review } from '../../reviews/entities/review.entity.js';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'client' | 'admin';
    restaurantId: number;
    restaurant: Relation<Restaurant>;
    reservations: Relation<Reservation[]>;
    reviews: Relation<Review[]>;
}
