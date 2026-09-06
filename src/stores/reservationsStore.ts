import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { ReservationInterface } from '@/interfaces/ReservationInterface';

export const useReservationStore = defineStore('reservation', () => {
  const reservations = ref<ReservationInterface[]>([]);

  function updateReservation(
    id: number,
    updates: Pick<
      ReservationInterface,
      'reservationDate' | 'reservationTime' | 'numberOfPeople' | 'specialRequest'
    >,
  ): void {
    const index = reservations.value.findIndex((reservation) => reservation.id === id);
    if (index !== -1 && reservations.value[index]) {
      reservations.value[index] = {
        ...reservations.value[index],
        ...updates,
      };
    }
  }

  return { reservations, updateReservation };
});
