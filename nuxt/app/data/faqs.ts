// Internal imports
import type { FaqInterface } from '~/interfaces/FaqInterface';

export const faqs: FaqInterface[] = [
  {
    question: '¿Cómo creo una reserva?',
    answer:
      'Ingresa al detalle de un restaurante, elige la fecha, la hora y el número de personas, y confirma tu solicitud.',
  },
  {
    question: '¿Puedo cancelar o modificar una reserva?',
    answer:
      'Sí. Desde el panel de reservas puedes editar o cancelar mientras el restaurante no la haya completado.',
  },
  {
    question: '¿Necesito una cuenta para reservar?',
    answer:
      'Sí, necesitas iniciar sesión para gestionar tus reservas y publicar reseñas sobre los restaurantes.',
  },
  {
    question: '¿Cómo se calcula la calificación de un restaurante?',
    answer:
      'Es el promedio de las reseñas aprobadas por el administrador del restaurante, en una escala de 1 a 5 estrellas.',
  },
  {
    question: '¿Reservia cobra por reservar?',
    answer: 'No. Reservar a través de Reservia es completamente gratuito para los clientes.',
  },
];