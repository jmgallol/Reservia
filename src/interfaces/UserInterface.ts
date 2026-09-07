export type UserRole = 'client' | 'admin';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  restaurantId?: number;
}

