import type { ReviewInterface } from '@/interfaces/ReviewInterface';

export const reviewSeeder: ReviewInterface[] = [
  // Restaurante 1: La Trattoria Di Roma
  {
    id: 1,
    restaurantId: 1,
    userId: 101,
    rating: 5,
    comment:
      'La pasta carbonara auténtica y el vino de la casa fueron excepcionales. El servicio 10/10.',
    status: 'approved',
    reviewDate: '2026-08-28T19:30:00Z',
  },
  {
    id: 2,
    restaurantId: 1,
    userId: 102,
    rating: 4,
    comment: 'Ambiente inmejorable para una cena romántica. Nos encantó el risotto y la atención.',
    status: 'approved',
    reviewDate: '2026-08-27T21:15:00Z',
  },
  {
    id: 3,
    restaurantId: 1,
    userId: 103,
    rating: 4,
    comment: 'Excelente comida y presentación. Un poco demorado el postre pero valió la pena.',
    status: 'approved',
    reviewDate: '2026-08-26T20:00:00Z',
  },
  {
    id: 4,
    restaurantId: 1,
    userId: 104,
    rating: 5,
    comment: 'Las mejores pizzas artesanales de la ciudad. Volveremos sin duda alguna.',
    status: 'approved',
    reviewDate: '2026-08-25T14:45:00Z',
  },

  // Restaurante 2: Cantina Los Compadres
  {
    id: 5,
    restaurantId: 2,
    userId: 105,
    rating: 5,
    comment:
      'Los tacos al pastor y el guacamole fresco son de otro nivel. La música en vivo crea un ambiente genial.',
    status: 'approved',
    reviewDate: '2026-08-28T21:00:00Z',
  },
  {
    id: 6,
    restaurantId: 2,
    userId: 106,
    rating: 4,
    comment:
      'Muy buena variedad de margaritas y excelente sazón mexicana. El servicio fue muy atento.',
    status: 'approved',
    reviewDate: '2026-08-27T19:30:00Z',
  },
  {
    id: 7,
    restaurantId: 2,
    userId: 107,
    rating: 5,
    comment:
      'Atención rápida y porciones generosas. Recomendadísimas las enchiladas suizas y las quesadillas.',
    status: 'approved',
    reviewDate: '2026-08-26T20:15:00Z',
  },

  // Restaurante 3: Sakura Sushi Bar
  {
    id: 8,
    restaurantId: 3,
    userId: 108,
    rating: 5,
    comment:
      'El sushi más fresco de Cartagena. Los rolls especiales y el tartar de atún son impecables.',
    status: 'approved',
    reviewDate: '2026-08-28T20:00:00Z',
  },
  {
    id: 9,
    restaurantId: 3,
    userId: 109,
    rating: 5,
    comment:
      'Experiencia gastronómica de primer nivel frente a la bahía. Presentación impecable y gran carta de sakes.',
    status: 'approved',
    reviewDate: '2026-08-27T21:30:00Z',
  },
  {
    id: 10,
    restaurantId: 3,
    userId: 101,
    rating: 3,
    comment:
      'Deliciosa propuesta nikkei y ambiente muy elegante. Excelente opción para ocasiones especiales.',
    status: 'approved',
    reviewDate: '2026-08-25T20:45:00Z',
  },

  // Restaurante 4: Fuego Criollo Asador
  {
    id: 11,
    restaurantId: 4,
    userId: 102,
    rating: 3,
    comment:
      'El bife de chorizo y las costillas en su punto exacto. Gran atención y ambiente campestre muy acogedor.',
    status: 'approved',
    reviewDate: '2026-08-28T13:30:00Z',
  },
  {
    id: 12,
    restaurantId: 4,
    userId: 110,
    rating: 4,
    comment:
      'Cortes jugosos y una terraza muy agradable en Cali. Las empanadas criollas de entrada son imperdibles.',
    status: 'approved',
    reviewDate: '2026-08-26T14:00:00Z',
  },
  {
    id: 13,
    restaurantId: 4,
    userId: 103,
    rating: 4,
    comment:
      'Muy buena comida típica y carnes a la brasa con porciones bastante generosas. Recomendado para familias.',
    status: 'approved',
    reviewDate: '2026-08-24T20:00:00Z',
  },

  // Restaurante 5: Olea Cocina Mediterránea
  {
    id: 14,
    restaurantId: 5,
    userId: 104,
    rating: 5,
    comment:
      'El arroz con mariscos y el pulpo a la brasa son insuperables. Excelente cava de vinos y servicio distinguido.',
    status: 'approved',
    reviewDate: '2026-08-28T20:30:00Z',
  },
  {
    id: 15,
    restaurantId: 5,
    userId: 105,
    rating: 4,
    comment:
      'Ambiente sobrio y sofisticado en la zona norte de Bogotá. Muy buenas tapas y postres artesanales.',
    status: 'approved',
    reviewDate: '2026-08-27T19:00:00Z',
  },
  {
    id: 16,
    restaurantId: 5,
    userId: 106,
    rating: 5,
    comment:
      'Una experiencia mediterránea memorable. El trato del personal fue sumamente cordial y profesional.',
    status: 'approved',
    reviewDate: '2026-08-25T21:00:00Z',
  },

  // Restaurante 6: Nikkei & Co. Fusión
  {
    id: 17,
    restaurantId: 6,
    userId: 107,
    rating: 5,
    comment:
      'Combinación perfecta entre cocina peruana y japonesa. El tiradito y el ceviche nikkei son una delicia.',
    status: 'approved',
    reviewDate: '2026-08-28T21:45:00Z',
  },
  {
    id: 18,
    restaurantId: 6,
    userId: 108,
    rating: 4,
    comment:
      'Coctelería de autor sobresaliente y platos muy bien equilibrados. Muy recomendado para cenar con amigos.',
    status: 'approved',
    reviewDate: '2026-08-26T20:30:00Z',
  },
  {
    id: 19,
    restaurantId: 6,
    userId: 109,
    rating: 5,
    comment:
      'Platos innovadores y ambiente moderno en El Poblado. Sin duda uno de mis restaurantes favoritos.',
    status: 'approved',
    reviewDate: '2026-08-24T19:15:00Z',
  },
];
