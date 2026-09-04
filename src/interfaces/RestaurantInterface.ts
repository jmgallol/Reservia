export type RestaurantStatus = 'active' | 'inactive';

export interface RestaurantInterface {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  category: string;
  capacity?: number;
  openingTime?: string;
  closingTime?: string;
  imageUrl?: string;
  status?: RestaurantStatus;
  latitude?: number;
  longitude?: number;
  rating?: number; // Calculated helper (from diagram: calculateAverageRating())
  reviewCount?: number;
  // Primitive relations
  adminId: number; // Diagram equivalent: user: User (Admin relation)
}
