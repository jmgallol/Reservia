import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { ReservationInterface } from '@/interfaces/ReservationInterface';
import { reservationSeedData } from '@/seeders/ReservationSeeder';

export const useReservationStore = defineStore('reservations', () => {
  const reservations = ref<ReservationInterface[]>([...reservationSeedData]);

  return {
    reservations,
  };
});
