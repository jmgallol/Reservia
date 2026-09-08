// External imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal imports
import type { ReservationInterface } from '@/interfaces/ReservationInterface';

export const useReservationStore = defineStore('reservation', () => {
  const reservations = ref<ReservationInterface[]>([]);

  return { reservations };
});
