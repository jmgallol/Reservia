import { CreateReviewDto } from './dto/create-review.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { Review } from './entities/review.entity.js';
import { ReviewsService } from './reviews.service.js';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findAll(): Promise<Review[]>;
    findOne(id: number): Promise<Review>;
    findByRestaurantId(id: number): Promise<Review[]>;
    findByUserId(id: number): Promise<Review[]>;
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(id: number): Promise<void>;
}
