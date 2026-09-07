// Internal imports
import type { CreateReservationDTO } from '@/dtos/CreateReservationDTO';
import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';
import { useReservationStore } from '@/stores/reservationsStore';

type UpdateReservationDTO = Pick<
  ReservationInterface,
  'reservationDate' | 'reservationTime' | 'numberOfPeople' | 'specialRequest'
>;

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

  static getByRestaurantId(restaurantId: number): ReservationInterface[] {
    const store = useReservationStore();
    return store.reservations.filter((r) => r.restaurantId === restaurantId);
  }

  static getByUserId(userId: number): ReservationInterface[] {
    const store = useReservationStore();
    return store.reservations.filter((r) => r.userId === userId);
  }

  static filterByClient(userId: number, status: string): ReservationInterface[] {
    const store = useReservationStore();
    return store.reservations.filter((r) => {
      if (r.userId !== userId) return false;
      return status === 'Todas' || r.status === status;
    });
  }

  static filter(restaurantId: number, status: string, peopleRange: string): ReservationInterface[] {
    const store = useReservationStore();
    return store.reservations.filter((r) => {
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
    const store = useReservationStore();
    const nextId =
      store.reservations.length > 0 ? Math.max(...store.reservations.map((r) => r.id)) + 1 : 1;

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

  static updateReservation(id: number, updates: UpdateReservationDTO): void {
    const store = useReservationStore();
    const index = store.reservations.findIndex((r) => r.id === id);
    if (index !== -1 && store.reservations[index]) {
      store.reservations[index] = {
        ...store.reservations[index],
        ...updates,
      };
    }
  }

  static canManageReservation(status: ReservationStatus): boolean {
    return status === 'pending' || status === 'confirmed';
  }

  static delete(id: number): void {
    const store = useReservationStore();
    const index = store.reservations.findIndex((r) => r.id === id);
    if (index !== -1) {
      store.reservations.splice(index, 1);
    }
  }
}
