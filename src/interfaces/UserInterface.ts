export type UserRole = 'client' | 'admin';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}
