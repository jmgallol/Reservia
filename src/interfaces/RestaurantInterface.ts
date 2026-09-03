export type RestaurantPriceLevel = 1 | 2 | 3 | 4;
export type RestaurantStatus = 'active' | 'inactive';

export interface RestaurantInterface {
  id: number;
  name: string;
  address: string;
  city: string;
  category: string;
  priceLevel: RestaurantPriceLevel;
  latitude: number;
  longitude: number;
  adminId: number;
  description?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  status?: RestaurantStatus;
}
