// Internal imports
import type { RestaurantInterface } from '#shared/interfaces/RestaurantInterface';

export const restaurants: RestaurantInterface[] = [
  {
    id: 1,
    name: 'La Hacienda del Fuego',
    description:
      'Parrilla tradicional con cortes premium, fogón a leña y una amplia carta de vinos sudamericanos.',
    address: 'Calle 10 # 5-23',
    city: 'Bogotá',
    category: 'Parrilla',
    openingTime: '12:00',
    closingTime: '22:00',
    averageRating: 4.7,
  },
  {
    id: 2,
    name: 'Sakura Garden',
    description: 'Cocina japonesa contemporánea con sushi artesanal y menú de degustación.',
    address: 'Carrera 15 # 85-40',
    city: 'Bogotá',
    category: 'Japonesa',
    openingTime: '12:30',
    closingTime: '23:00',
    averageRating: 4.5,
  },
  {
    id: 3,
    name: 'Trattoria Nonna Lucia',
    description: 'Pastas frescas hechas a diario y recetas italianas de tres generaciones.',
    address: 'Avenida El Poblado # 9-12',
    city: 'Medellín',
    category: 'Italiana',
    openingTime: '11:30',
    closingTime: '21:30',
    averageRating: 4.8,
  },
];
