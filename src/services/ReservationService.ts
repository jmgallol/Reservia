import type { CreateReservationDTO } from '@/dtos/CreateReservationDTO';
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

  static createReservation(dto: CreateReservationDTO): ReservationInterface {
    this.ensureInitialized();
    const store = useReservationStore();
    const nextId =
      store.reservations.length > 0 ? Math.max(...store.reservations.map((r) => r.id)) + 1 : 1;

    const newReservation: ReservationInterface = {
      id: nextId,
      restaurantId: dto.restaurantId,
      userId: dto.userId ?? 0,
      clientName: dto.clientName,
      clientEmail: dto.clientEmail ?? '',
      date: dto.date,
      time: dto.time,
      guests: dto.guests,
      status: 'pending',
      specialRequest: dto.specialRequest ?? '',
    };

    store.reservations.push(newReservation);
    return newReservation;
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
