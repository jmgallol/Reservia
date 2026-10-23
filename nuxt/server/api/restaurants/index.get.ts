// Internal imports
import { restaurants } from '../../data/restaurants';

export default defineEventHandler(async () => {
  return restaurants;
});
