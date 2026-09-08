// External imports
import { createPinia } from 'pinia';
import { watch } from 'vue';

// Internal imports
import { reservationSeeder } from '@/seeders/ReservationSeeder';
import { restaurantSeeder } from '@/seeders/RestaurantSeeder';
import { reviewSeeder } from '@/seeders/ReviewSeeder';
import { userSeeder } from '@/seeders/UserSeeder';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');
    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {
      pinia.state.value = {
        reservation: {
          reservations: reservationSeeder,
        },
        restaurant: {
          restaurants: restaurantSeeder,
        },
        review: {
          reviews: reviewSeeder,
        },
        user: {
          users: userSeeder,
        },
      };

      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },
      {
        deep: true,
      },
    );
    return pinia;
  }
}
