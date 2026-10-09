import { CreateReviewDto } from "./dto/create-review.dto.js";
import { UpdateReviewDto } from "./dto/update-review.dto.js";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity.js";
export declare class ReviewsService {
    private reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    getAll(): Promise<Review[]>;
    getById(id: number): Promise<Review>;
    getByRestaurantId(restaurantId: number): Promise<Review[]>;
    getByUserId(userId: number): Promise<Review[]>;
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    delete(id: number): Promise<void>;
}
