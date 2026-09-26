import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "../restaurants/entities/restaurant.entity.js";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto.js";

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) {}

    async findAll(query?: string, city?: string, category?: string): Promise<Restaurant[]> {
        const queryBuilder = this.restaurantRepository.createQueryBuilder("restaurant");

        if (city && city.toLowerCase() !== "todas") {
            queryBuilder.andWhere("LOWER(restaurant.city) = :city", { city: city.toLowerCase() });
        }

        if (category && category.toLowerCase() !== "todas") {
            queryBuilder.andWhere("LOWER(restaurant.category) = :category", { category: category.toLowerCase() });
        }

        if (query) {
            const normalizedQuery = query.toLowerCase();
            queryBuilder.andWhere(
                "(LOWER(restaurant.name) LIKE :query OR LOWER(restaurant.city) LIKE :query OR LOWER(restaurant.category) LIKE :query)",
                { query: `%${normalizedQuery}%` }
            );
        }

        return queryBuilder.getMany();
    }

    async findOne(id: number): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.findOneBy({ id });
        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID ${id} not found`);
        }
        return restaurant;
    }

    async getCities(): Promise<string[]> {
        const result = await this.restaurantRepository
            .createQueryBuilder("restaurant")
            .select("DISTINCT(restaurant.city)", "city")
            .getRawMany();
        
        const cities = result.map(r => r.city).sort((a, b) => a.localeCompare(b));
        return ['Todas', ...cities];
    }

    async getCategories(): Promise<string[]> {
        const result = await this.restaurantRepository
            .createQueryBuilder("restaurant")
            .select("DISTINCT(restaurant.category)", "category")
            .getRawMany();
        
        const categories = result.map(r => r.category).sort((a, b) => a.localeCompare(b));
        return ['Todas', ...categories];
    }

    async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const restaurant = this.restaurantRepository.create(createRestaurantDto);
        return this.restaurantRepository.save(restaurant);
    }

    async update(id: number, updateRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const restaurant = await this.findOne(id);
        const updatedRestaurant = this.restaurantRepository.merge(restaurant, updateRestaurantDto);
        return this.restaurantRepository.save(updatedRestaurant);
    }

    async remove(id: number): Promise<void> {
        const restaurant = await this.findOne(id);
        await this.restaurantRepository.remove(restaurant);
    }
}