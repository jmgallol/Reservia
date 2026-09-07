export interface RestaurantInterface {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  category: string;
  openingTime?: string;
  closingTime?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  adminId: number;
}
