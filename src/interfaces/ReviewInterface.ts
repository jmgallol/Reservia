export interface ReviewInterface {
  id: number;
  rating: number;
  comment: string;
  status: string;
  user: string;
  restaurantId: number;
  createdAt?: string;
  updatedAt?: string;
}
