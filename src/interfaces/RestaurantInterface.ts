export type RestaurantStatus = 'active' | 'inactive';

export interface RestaurantInterface {
  id: number;
  name: string;
  address: string;
  city: string;
  category: string;
  adminId: number;
  description?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  status?: RestaurantStatus;
}
