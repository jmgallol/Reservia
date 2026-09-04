export type UserRole = 'client' | 'admin';
export type UserStatus = 'active' | 'inactive';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  status?: UserStatus;
  restaurantId?: number;
}
