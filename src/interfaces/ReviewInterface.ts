export type ReviewStatus = 'approved' | 'pending' | 'rejected';

export interface ReviewInterface {
  id: number;
  rating: number;
  comment: string;
  reviewDate?: string;
  status?: ReviewStatus | string;
  userId: number;
  restaurantId: number;
}
