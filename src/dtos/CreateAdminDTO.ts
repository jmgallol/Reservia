import type { UserInterface } from '@/interfaces/UserInterface';

export type CreateAdminDTO = Omit<UserInterface, 'id' | 'role'> & {
  restaurantName: string;
  restaurantAddress: string;
  restaurantCity: string;
  restaurantCategory: string;
};
