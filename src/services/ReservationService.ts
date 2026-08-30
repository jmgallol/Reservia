import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';

import { reservationSeedData } from '@/seeders/ReservationSeeder';
import { useReservationStore } from '@/stores/reservationsStore';

export class ReservationService {
  private static ensureInitialized(): void {
    const store = useReservationStore();
    if (store.reservations.length === 0) {
      store.reservations = [...reservationSeedData];
    }
  }

  static getReservations(): ReservationInterface[] {
    this.ensureInitialized();
    const store = useReservationStore();
    return store.reservations;
  }

  static getReservationById(id: number): ReservationInterface | undefined {
    this.ensureInitialized();
    const store = useReservationStore();
    return store.reservations.find((r) => r.id === id);
  }

  static getUpcomingReservations(): ReservationInterface[] {
    this.ensureInitialized();
    const store = useReservationStore();
    return store.reservations.filter((r) => r.date === 'Hoy' || r.date === 'Mañana');
  }

  static createReservation(reservation: ReservationInterface): void {
    this.ensureInitialized();
    const store = useReservationStore();
    const nextId =
      store.reservations.length > 0 ? Math.max(...store.reservations.map((r) => r.id)) + 1 : 1;
    store.reservations.push({
      ...reservation,
      id: nextId,
    });
  }

  static updateReservationStatus(id: number, status: ReservationStatus): void {
    this.ensureInitialized();
    const store = useReservationStore();
    const index = store.reservations.findIndex((r) => r.id === id);
    if (index !== -1 && store.reservations[index]) {
      store.reservations[index].status = status;
    }
  }

  static deleteReservation(id: number): void {
    this.ensureInitialized();
    const store = useReservationStore();
    const index = store.reservations.findIndex((r) => r.id === id);
    if (index !== -1) {
      store.reservations.splice(index, 1);
    }
  }
}
