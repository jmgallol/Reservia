import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';

import { reviewSeedData } from '@/seeders/ReviewSeeder';
import { useReviewStore } from '@/stores/reviewStore';

export class ReviewService {
  private static ensureInitialized(): void {
    const store = useReviewStore();
    if (store.reviews.length === 0) {
      store.reviews = [...reviewSeedData];
    }
  }

  static getReviews(): ReviewInterface[] {
    this.ensureInitialized();
    const store = useReviewStore();
    return store.reviews;
  }

  static getReviewById(id: number): ReviewInterface | undefined {
    this.ensureInitialized();
    const store = useReviewStore();
    return store.reviews.find((review) => review.id === id);
  }

  static getReviewsByRestaurantId(id: number): ReviewInterface[] {
    this.ensureInitialized();
    const store = useReviewStore();
    return store.reviews.filter((review) => review.restaurantId === id);
  }

  static createReview(dto: CreateReviewDTO): ReviewInterface {
    this.ensureInitialized();
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

  static updateReview(review: ReviewInterface): void {
    this.ensureInitialized();
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

  static deleteReview(id: number): void {
    this.ensureInitialized();
    const store = useReviewStore();
    const index = store.reviews.findIndex((r) => r.id === id);
    if (index !== -1) {
      store.reviews.splice(index, 1);
    }
  }
}
