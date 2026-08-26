import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import { useReviewStore } from '@/stores/reviewstore';

export class ReviewService {
  static getReviews(): ReviewInterface[] {
    const store = useReviewStore();
    return store.reviews;
  }

  static getReviewById(id: number): ReviewInterface | undefined {
    const store = useReviewStore();
    return store.reviews.find((review) => review.id === id);
  }

  static getReviewsByRestaurantId(id: number): ReviewInterface[] {
    const store = useReviewStore();
    return store.reviews.filter((review) => review.restaurantId === id);
  }

  static createReview(review: ReviewInterface): void {
    const store = useReviewStore();
    const nextId = store.reviews.length > 0 ? Math.max(...store.reviews.map((r) => r.id)) + 1 : 1;
    store.reviews.push({
      ...review,
      id: nextId,
      status: 'approved',
      createdAt: new Date().toISOString(),
    });
  }

  static updateReview(review: ReviewInterface): void {
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
    const store = useReviewStore();
    const index = store.reviews.findIndex((r) => r.id === id);
    if (index !== -1) {
      store.reviews.splice(index, 1);
    }
  }
}
