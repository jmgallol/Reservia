import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { ReservationInterface } from '@/interfaces/ReservationInterface';

export const useReservationStore = defineStore('reservation', () => {
  const reservations = ref<ReservationInterface[]>([]);

  return { reservations };
});
