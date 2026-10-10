import { CreateRestaurantDto } from './dto/create-restaurant.dto.js';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto.js';
import { Restaurant } from './entities/restaurant.entity.js';
import { RestaurantsService } from './restaurants.service.js';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    findAll(query?: string, city?: string, category?: string): Promise<Restaurant[]>;
    getCities(): Promise<string[]>;
    getCategories(): Promise<string[]>;
    findOne(id: number): Promise<Restaurant>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    remove(id: number): Promise<void>;
}
