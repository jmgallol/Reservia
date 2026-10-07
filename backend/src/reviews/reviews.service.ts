// Imports
import { CreateReviewDto } from "./dto/create-review.dto.js";
import { UpdateReviewDto } from "./dto/update-review.dto.js";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity.js";


@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) {}

    async getAll(): Promise<Review[]> {
        return this.reviewRepository.find({
            relations: { user: true, restaurant: true }
        });
    }

    async getById(id: number): Promise<Review> {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: { user: true, restaurant: true }
        });
        if(!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }

    async getByRestaurantId(restaurantId: number): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({
            where: { restaurantId },
            relations: { user: true, restaurant: true }
        });
        return reviews;
    }

    async getByUserId(userId: number): Promise<Review[]> {
        const reviews = await this.reviewRepository.find({
            where: { userId },
            relations: { user: true, restaurant: true }
        });
        return reviews;
    }

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const review = this.reviewRepository.create({
            ...createReviewDto,
            userId: createReviewDto.userId ?? 0,
            rating: Math.min(5, Math.max(1, createReviewDto.rating ?? 5)),
            status: createReviewDto.status || 'approved',
            date: createReviewDto.date || new Date().toISOString()
        });
        return this.reviewRepository.save(review);
    }

    async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
        const review = await this.getById(id);
        const updateReview = this.reviewRepository.merge(review, updateReviewDto);
        return this.reviewRepository.save(updateReview);
    }

    async delete(id: number): Promise<void> {
        const review = await this.getById(id);
        await this.reviewRepository.remove(review);
    }
}