// Internal imports
import type { CreateReservationDTO } from '@/dtos/CreateReservationDTO';
import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';
import { useReservationStore } from '@/stores/reservationsStore';

// Types
type UpdateReservationDTO = Pick<
  ReservationInterface,
  'reservationDate' | 'reservationTime' | 'numberOfPeople' | 'specialRequest'
>;

export class ReservationService {
  static getAll(): ReservationInterface[] {
    return useReservationStore().reservations;
  }

  static getById(id: number): ReservationInterface | undefined {
    return useReservationStore().reservations.find((r) => r.id === id);
  }

  static getByStatus(status: ReservationStatus): ReservationInterface[] {
    return useReservationStore().reservations.filter((r) => r.status === status);
  }

  static getByRestaurantId(restaurantId: number): ReservationInterface[] {
    return useReservationStore().reservations.filter((r) => r.restaurantId === restaurantId);
  }

  static getByUserId(userId: number): ReservationInterface[] {
    return useReservationStore().reservations.filter((r) => r.userId === userId);
  }

  static filterByClient(userId: number, status: string): ReservationInterface[] {
    return useReservationStore().reservations.filter((r) => {
      if (r.userId !== userId) return false;
      return status === 'Todas' || r.status === status;
    });
  }

  static filter(restaurantId: number, status: string, peopleRange: string): ReservationInterface[] {
    return useReservationStore().reservations.filter((r) => {
      if (r.restaurantId !== restaurantId) return false;

      const matchesStatus = status === 'Todas' || r.status === status;

      let matchesPeople = true;
      if (peopleRange !== 'Todos') {
        if (peopleRange === '7+') {
          matchesPeople = r.numberOfPeople >= 7;
        } else {
          const parts = peopleRange.split('-').map(Number);
          const min = parts[0] ?? 0;
          const max = parts[1] ?? 0;
          matchesPeople = r.numberOfPeople >= min && r.numberOfPeople <= max;
        }
      }

      return matchesStatus && matchesPeople;
    });
  }

  static create(dto: CreateReservationDTO): ReservationInterface {
    const reservations = useReservationStore().reservations;
    const nextId = reservations.length > 0 ? Math.max(...reservations.map((r) => r.id)) + 1 : 1;

    const newReservation: ReservationInterface = {
      id: nextId,
      restaurantId: dto.restaurantId,
      userId: dto.userId ?? 0,
      reservationDate: dto.reservationDate,
      reservationTime: dto.reservationTime,
      numberOfPeople: dto.numberOfPeople,
      status: 'pending',
      specialRequest: dto.specialRequest ?? '',
    };

    useReservationStore().reservations.push(newReservation);

    return newReservation;
  }

  static updateStatus(id: number, status: ReservationStatus): void {
    const reservations = useReservationStore().reservations;
    const index = reservations.findIndex((r) => r.id === id);
    if (index !== -1 && reservations[index]) {
      reservations[index].status = status;
    }
  }

  static updateReservation(id: number, updates: UpdateReservationDTO): void {
    const reservations = useReservationStore().reservations;
    const index = reservations.findIndex((r) => r.id === id);
    const existing = reservations[index];

    if (index !== -1 && existing) {
      reservations[index] = {
        ...existing,
        ...updates,
      };
    }
  }

  static canManageReservation(status: ReservationStatus): boolean {
    return status === 'pending' || status === 'confirmed';
  }

  static delete(id: number): void {
    const reservations = useReservationStore().reservations;
    const index = reservations.findIndex((r) => r.id === id);
    if (index !== -1) {
      reservations.splice(index, 1);
    }
  }
}
