export class CreateReviewDto {
    rating!: number;
    comment!: string;
    reviewDate?: string;
    status?: string;
    userId!: number;
    restaurantId!: number;
}