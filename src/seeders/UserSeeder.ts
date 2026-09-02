import type { UserInterface } from '@/interfaces/UserInterface';

export const userSeeder: UserInterface[] = [
  {
    id: 1,
    name: 'Admin Reservia',
    email: 'admin@reservia.com',
    phone: '555-000-1111',
    password: 'password123',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Cliente Prueba',
    email: 'cliente@reservia.com',
    phone: '555-000-2222',
    password: 'password123',
    role: 'client',
  },
];
