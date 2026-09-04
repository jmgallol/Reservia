export type ReviewStatus = 'approved' | 'pending' | 'rejected';

export interface ReviewInterface {
  id: number;
  rating: number;
  comment: string;
  createdAt?: string; // Diagram equivalent: reviewDate
  status?: ReviewStatus | string;
  user?: string;
  updatedAt?: string;
  // Primitive relations (Foreign keys)
  userId?: number; // Diagram equivalent: user: User (FK relation)
  restaurantId: number; // Diagram equivalent: restaurant: Restaurant (FK relation)
}
