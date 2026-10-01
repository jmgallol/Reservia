// Imports
import { CreateRestaurantDto } from "./dto/create-restaurant.dto.js";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto.js";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "../restaurants/entities/restaurant.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) {}

    async findAll(query?: string, city?: string, category?: string): Promise<Restaurant[]> {
        const queryBuilder = this.restaurantRepository.createQueryBuilder("restaurant")
            .leftJoinAndSelect("restaurant.reviews", "reviews");

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

        const restaurants = await queryBuilder.getMany();
        return restaurants.map(r => this.appendAverageRating(r));
    }

    async findOne(id: number): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: { reviews: true }
        });
        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID ${id} not found`);
        }
        
        return this.appendAverageRating(restaurant);
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
        const savedRestaurant = await this.restaurantRepository.save(restaurant);
        
        if (savedRestaurant.adminId) {
            await this.restaurantRepository.manager.query(
                `UPDATE user SET restaurantId = ? WHERE id = ?`,
                [savedRestaurant.id, savedRestaurant.adminId]
            );
        }
        
        return savedRestaurant;
    }

    async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
        const restaurant = await this.findOne(id);
        const updatedRestaurant = this.restaurantRepository.merge(restaurant, updateRestaurantDto);
        return this.restaurantRepository.save(updatedRestaurant);
    }

    async delete(id: number): Promise<void> {
        const restaurant = await this.findOne(id);
        await this.restaurantRepository.remove(restaurant);
    }

    private appendAverageRating(restaurant: Restaurant): Restaurant {
        const reviews = restaurant.reviews || [];
        const avg = reviews.length > 0 
            ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
            : 4.8;
        
        delete (restaurant as any).reviews;
        restaurant.averageRating = avg;
        return restaurant;
    }
}