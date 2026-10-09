import type { Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Restaurant } from '../../restaurants/entities/restaurant.entity.js';
export declare class Reservation {
    id: number;
    date: string;
    time: string;
    numberOfPeople: number;
    status: string;
    specialRequest: string;
    userId: number;
    restaurantId: number;
    user: Relation<User>;
    restaurant: Relation<Restaurant>;
}
