import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export const reviewSeedData: ReviewInterface[] = [
  {
    id: 1,
    restaurantId: 1,
    user: 'Manuela Castaño',
    rating: 5,
    comment:
      'La pasta carbonara auténtica y el vino de la casa fueron excepcionales. El servicio 10/10.',
    status: 'approved',
    createdAt: '2026-08-28T19:30:00Z',
  },
  {
    id: 2,
    restaurantId: 1,
    user: 'Andrés Felipe Ruiz',
    rating: 5,
    comment: 'Ambiente inmejorable para una cena romántica. Nos encantó el risotto y la atención.',
    status: 'approved',
    createdAt: '2026-08-27T21:15:00Z',
  },
  {
    id: 3,
    restaurantId: 1,
    user: 'Carolina Morales',
    rating: 4,
    comment: 'Excelente comida y presentación. Un poco demorado el postre pero valió la pena.',
    status: 'approved',
    createdAt: '2026-08-26T20:00:00Z',
  },
  {
    id: 4,
    restaurantId: 1,
    user: 'Sebastián Vélez',
    rating: 5,
    comment: 'Las mejores pizzas artesanales de la ciudad. Volveremos sin duda alguna.',
    status: 'approved',
    createdAt: '2026-08-25T14:45:00Z',
  },
];
