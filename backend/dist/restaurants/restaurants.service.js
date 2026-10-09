var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "../restaurants/entities/restaurant.entity.js";
import { Repository } from "typeorm";
let RestaurantsService = class RestaurantsService {
    restaurantRepository;
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    async getAll(query, city, category) {
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
            queryBuilder.andWhere("(LOWER(restaurant.name) LIKE :query OR LOWER(restaurant.city) LIKE :query OR LOWER(restaurant.category) LIKE :query)", { query: `%${normalizedQuery}%` });
        }
        const restaurants = await queryBuilder.getMany();
        return restaurants.map(r => this.calculateAverageRating(r));
    }
    async getById(id) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: { reviews: true }
        });
        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID ${id} not found`);
        }
        return this.calculateAverageRating(restaurant);
    }
    async getCities() {
        const result = await this.restaurantRepository
            .createQueryBuilder("restaurant")
            .select("DISTINCT(restaurant.city)", "city")
            .getRawMany();
        const cities = result.map(r => r.city).sort((a, b) => a.localeCompare(b));
        return ['Todas', ...cities];
    }
    async getCategories() {
        const result = await this.restaurantRepository
            .createQueryBuilder("restaurant")
            .select("DISTINCT(restaurant.category)", "category")
            .getRawMany();
        const categories = result.map(r => r.category).sort((a, b) => a.localeCompare(b));
        return ['Todas', ...categories];
    }
    async create(createRestaurantDto) {
        const restaurant = this.restaurantRepository.create(createRestaurantDto);
        const savedRestaurant = await this.restaurantRepository.save(restaurant);
        if (savedRestaurant.adminId) {
            await this.restaurantRepository.manager.query(`UPDATE user SET restaurantId = ? WHERE id = ?`, [savedRestaurant.id, savedRestaurant.adminId]);
        }
        return savedRestaurant;
    }
    async update(id, updateRestaurantDto) {
        const restaurant = await this.getById(id);
        const updatedRestaurant = this.restaurantRepository.merge(restaurant, updateRestaurantDto);
        return this.restaurantRepository.save(updatedRestaurant);
    }
    async delete(id) {
        const restaurant = await this.getById(id);
        await this.restaurantRepository.remove(restaurant);
    }
    calculateAverageRating(restaurant) {
        const reviews = restaurant.reviews || [];
        const avg = reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
            : 4.8;
        delete restaurant.reviews;
        restaurant.averageRating = avg;
        return restaurant;
    }
};
RestaurantsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Restaurant)),
    __metadata("design:paramtypes", [Repository])
], RestaurantsService);
export { RestaurantsService };
//# sourceMappingURL=restaurants.service.js.map