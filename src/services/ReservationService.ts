import type { CreateReservationDTO } from '@/dtos/CreateReservationDTO';
import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';

import { useReservationStore } from '@/stores/reservationsStore';

export class ReservationService {
  static getAll(): ReservationInterface[] {
    const store = useReservationStore();
    return store.reservations;
  }

  static getById(id: number): ReservationInterface | undefined {
    const store = useReservationStore();
    return store.reservations.find((r) => r.id === id);
  }

  static getByStatus(status: ReservationStatus): ReservationInterface[] {
    const store = useReservationStore();
    return store.reservations.filter((r) => r.status === status);
  }

  static create(dto: CreateReservationDTO): ReservationInterface {
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

  static updateStatus(id: number, status: ReservationStatus): void {
    const store = useReservationStore();
    const index = store.reservations.findIndex((r) => r.id === id);
    if (index !== -1 && store.reservations[index]) {
      store.reservations[index].status = status;
    }
  }

  static delete(id: number): void {
    const store = useReservationStore();
    const index = store.reservations.findIndex((r) => r.id === id);
    if (index !== -1) {
      store.reservations.splice(index, 1);
    }
  }
}
