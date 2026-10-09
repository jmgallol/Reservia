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
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity.js";
let ReviewsService = class ReviewsService {
    reviewRepository;
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async getAll() {
        return this.reviewRepository.find({
            relations: { user: true, restaurant: true }
        });
    }
    async getById(id) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: { user: true, restaurant: true }
        });
        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }
    async getByRestaurantId(restaurantId) {
        const reviews = await this.reviewRepository.find({
            where: { restaurantId },
            relations: { user: true, restaurant: true }
        });
        return reviews;
    }
    async getByUserId(userId) {
        const reviews = await this.reviewRepository.find({
            where: { userId },
            relations: { user: true, restaurant: true }
        });
        return reviews;
    }
    async create(createReviewDto) {
        const review = this.reviewRepository.create({
            ...createReviewDto,
            userId: createReviewDto.userId ?? 0,
            rating: Math.min(5, Math.max(1, createReviewDto.rating ?? 5)),
            status: createReviewDto.status || 'approved',
            date: createReviewDto.date || new Date().toISOString()
        });
        return this.reviewRepository.save(review);
    }
    async update(id, updateReviewDto) {
        const review = await this.getById(id);
        const updateReview = this.reviewRepository.merge(review, updateReviewDto);
        return this.reviewRepository.save(updateReview);
    }
    async delete(id) {
        const review = await this.getById(id);
        await this.reviewRepository.remove(review);
    }
};
ReviewsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Review)),
    __metadata("design:paramtypes", [Repository])
], ReviewsService);
export { ReviewsService };
//# sourceMappingURL=reviews.service.js.map