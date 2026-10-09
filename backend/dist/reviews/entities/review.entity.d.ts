import type { Relation } from "typeorm";
import { User } from "../../users/entities/user.entity.js";
import { Restaurant } from "../../restaurants/entities/restaurant.entity.js";
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    date: string;
    status: string;
    userId: number;
    restaurantId: number;
    user: Relation<User>;
    restaurant: Relation<Restaurant>;
}
