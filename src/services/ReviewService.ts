import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

import { useReviewStore } from '@/stores/reviewStore';

export class ReviewService {
  static getAll(): ReviewInterface[] {
    const store = useReviewStore();
    return store.reviews;
  }

  static getById(id: number): ReviewInterface | undefined {
    const store = useReviewStore();
    return store.reviews.find((review) => review.id === id);
  }

  static getByRestaurantId(id: number): ReviewInterface[] {
    const store = useReviewStore();
    return store.reviews.filter((review) => review.restaurantId === id);
  }

  static create(dto: CreateReviewDTO): ReviewInterface {
    const store = useReviewStore();
    const nextId = store.reviews.length > 0 ? Math.max(...store.reviews.map((r) => r.id)) + 1 : 1;

    const newReview: ReviewInterface = {
      id: nextId,
      restaurantId: dto.restaurantId,
      rating: Math.min(5, Math.max(1, dto.rating)),
      comment: dto.comment,
      user: dto.user?.trim() || 'Anónimo',
      status: 'approved',
      createdAt: new Date().toISOString(),
    };

    store.reviews.push(newReview);
    return newReview;
  }

  static update(review: ReviewInterface): void {
    const store = useReviewStore();
    const index = store.reviews.findIndex((r) => r.id === review.id);
    if (index !== -1) {
      store.reviews[index] = {
        ...store.reviews[index],
        ...review,
        updatedAt: new Date().toISOString(),
      };
    }
  }

  static delete(id: number): void {
    const store = useReviewStore();
    const index = store.reviews.findIndex((r) => r.id === id);
    if (index !== -1) {
      store.reviews.splice(index, 1);
    }
  }
}
