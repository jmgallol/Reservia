export class CreateReviewDto {
    rating: number;
    comment: string;
    date?: string;
    status?: string;
    userId: number;
    restaurantId: number;
}