export class CreateRestaurantDto {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  category?: string;
  openingTime?: string;
  closingTime?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  adminId?: number;
}