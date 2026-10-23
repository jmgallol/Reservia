// Internal imports
import { restaurants } from '../../data/restaurants';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, statusMessage: 'El id del restaurante no es válido' });
  }

  const restaurant = restaurants.find((item) => item.id === id);

  if (!restaurant) {
    throw createError({ statusCode: 404, statusMessage: 'Restaurante no encontrado' });
  }

  return restaurant;
});
