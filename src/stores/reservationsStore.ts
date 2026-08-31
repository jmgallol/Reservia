import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { ReservationInterface } from '@/interfaces/ReservationInterface';

export const useReservationStore = defineStore('reservations', () => {
  const reservations = ref<ReservationInterface[]>([]);

  return {
    reservations,
  };
});
