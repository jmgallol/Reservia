export type RestaurantStatus = 'active' | 'inactive';

export interface RestaurantInterface {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  category: string;
  averagePrice?: number;
  capacity?: number;
  openingTime?: string;
  closingTime?: string;
  imageUrl?: string;
  status?: RestaurantStatus;
  latitude?: number;
  longitude?: number;
  adminId: number;
}
