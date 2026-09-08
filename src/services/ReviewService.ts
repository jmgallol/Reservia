// Internal imports
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewStore';

export class ReviewService {
  static getAll(): ReviewInterface[] {
    return useReviewStore().reviews;
  }

  static getById(id: number): ReviewInterface | undefined {
    return useReviewStore().reviews.find((review) => review.id === id);
  }

  static getByRestaurantId(id: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.restaurantId === id);
  }

  static getByUserId(userId: number): ReviewInterface[] {
    return useReviewStore().reviews.filter((review) => review.userId === userId);
  }

  static create(dto: CreateReviewDTO): ReviewInterface {
    const reviews = useReviewStore().reviews;
    const nextId = reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;

    const newReview: ReviewInterface = {
      id: nextId,
      restaurantId: dto.restaurantId,
      userId: dto.userId ?? 0,
      rating: Math.min(5, Math.max(1, dto.rating)),
      comment: dto.comment,
      status: 'approved',
      reviewDate: new Date().toISOString(),
    };

    useReviewStore().reviews.push(newReview);

    return newReview;
  }

  static update(review: ReviewInterface): void {
    const reviews = useReviewStore().reviews;
    const index = reviews.findIndex((r) => r.id === review.id);
    if (index !== -1 && reviews[index]) {
      reviews[index] = {
        ...reviews[index],
        ...review,
      };
    }
  }

  static delete(id: number): void {
    const reviews = useReviewStore().reviews;
    const index = reviews.findIndex((r) => r.id === id);
    if (index !== -1) {
      reviews.splice(index, 1);
    }
  }

  static getAverageRating(restaurantId: number): number {
    const reviews = ReviewService.getByRestaurantId(restaurantId);
    if (reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);

    return Math.round((total / reviews.length) * 10) / 10;
  }
}
