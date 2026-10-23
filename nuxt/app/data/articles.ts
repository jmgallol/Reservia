// Internal imports
import type { ArticleInterface } from '~/interfaces/ArticleInterface';

export const articles: ArticleInterface[] = [
  {
    id: '1',
    title: 'Los 5 KPIs que todo dashboard de reservas debería mostrar',
    summary:
      'Reservas confirmadas, ocupación, cancelaciones, calificación promedio y horas pico.',
    author: 'Juan',
    publishedAt: '2026-08-12',
    paragraphs: [
      'Un dashboard para administradores de restaurantes no necesita docenas de gráficos. Necesita responder rápido a una pregunta: ¿cómo va mi operación hoy?',
      'El primer indicador es el número de reservas confirmadas frente a las pendientes. Si hay muchas pendientes, el equipo está perdiendo comensales por no responder a tiempo.',
      'El segundo es la tasa de ocupación por franja horaria. Permite detectar las horas pico y las horas muertas, y decidir dónde conviene ofrecer promociones.',
      'El tercero es la tasa de cancelaciones. Una cifra alta suele indicar problemas de comunicación o de políticas de reserva demasiado flexibles.',
      'Los dos últimos son la calificación promedio y el volumen de reseñas. Juntos muestran la reputación del restaurante.',
    ],
  },
  {
    id: '2',
    title: 'Cómo reducir las cancelaciones y los no-shows en tu restaurante',
    summary: 'Recordatorios, confirmaciones activas y políticas claras que ayudan a llenar más mesas.',
    author: 'David',
    publishedAt: '2026-09-02',
    paragraphs: [
      'Cada mesa vacía por una reserva que nadie canceló es dinero perdido. Los no-shows son uno de los mayores dolores de cabeza del sector gastronómico.',
      'La estrategia más efectiva es enviar un recordatorio automático el día anterior, con un botón claro para confirmar o cancelar la reserva.',
      'También ayuda pedir a los clientes un registro previo. Quien ya tiene una cuenta y un historial de reseñas suele comprometerse más con su reserva.',
      'Finalmente, un dashboard que muestre el historial de cancelaciones por cliente permite identificar patrones y actuar a tiempo.',
    ],
  },
  {
    id: '3',
    title: 'Reseñas de clientes: cómo convertirlas en reputación',
    summary:
      'Por qué responder y moderar reseñas desde el panel de administración mejora la confianza.',
    author: 'Isabel',
    publishedAt: '2026-09-25',
    paragraphs: [
      'Las reseñas son la primera referencia que consulta un cliente antes de reservar. Un restaurante con pocas reseñas parece desconocido, aunque sea excelente.',
      'Invitar a dejar una reseña justo después de una reserva completada multiplica la cantidad de opiniones recibidas.',
      'Moderar las reseñas desde el panel de administración permite aprobar las legítimas y rechazar las que incumplen las normas de la comunidad.',
      'Responder con amabilidad a las críticas demuestra compromiso y suele convertir una mala experiencia en una oportunidad de fidelización.',
    ],
  },
];
