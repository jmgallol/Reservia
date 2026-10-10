import { CreateRestaurantDto } from './dto/create-restaurant.dto.js';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto.js';
import { Restaurant } from '../restaurants/entities/restaurant.entity.js';
import { Repository } from 'typeorm';
export declare class RestaurantsService {
    private restaurantRepository;
    constructor(restaurantRepository: Repository<Restaurant>);
    getAll(query?: string, city?: string, category?: string): Promise<Restaurant[]>;
    getById(id: number): Promise<Restaurant>;
    getCities(): Promise<string[]>;
    getCategories(): Promise<string[]>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    delete(id: number): Promise<void>;
    private calculateAverageRating;
}
