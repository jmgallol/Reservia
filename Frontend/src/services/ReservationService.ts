// Internal imports
import type { CreateReservationDTO } from '@/dtos/CreateReservationDTO';
import type { UpdateReservationDTO } from '@/dtos/UpdateReservationDTO';
import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';
import { BaseService } from '@/services/BaseService';

export class ReservationService extends BaseService {
  private static readonly API_URL = `${import.meta.env.VITE_API_URL}/reservations`;

  static getAll(): Promise<ReservationInterface[]> {
    return this.makeRequest(this.API_URL);
  }

  static getById(id: number): Promise<ReservationInterface> {
    return this.makeRequest(`${this.API_URL}/${id}`);
  }

  static getByStatus(status: ReservationStatus): Promise<ReservationInterface[]> {
    return this.makeRequest(`${this.API_URL}/status?status=${status}`);
  }

  static getByRestaurantId(restaurantId: number): Promise<ReservationInterface[]> {
    return this.makeRequest(`${this.API_URL}/restaurant/${restaurantId}`);
  }

  static getByUserId(userId: number): Promise<ReservationInterface[]> {
    return this.makeRequest(`${this.API_URL}/user/${userId}`);
  }

  static async filterByClient(userId: number, status: string): Promise<ReservationInterface[]> {
    const reservations = await this.getByUserId(userId);
    return reservations.filter((r) => status === 'Todas' || r.status === status);
  }

  static async filter(
    restaurantId: number,
    status: string,
    peopleRange: string,
  ): Promise<ReservationInterface[]> {
    const reservations = await this.getByRestaurantId(restaurantId);

    return reservations.filter((r) => {
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

  static create(dto: CreateReservationDTO): Promise<ReservationInterface> {
    return this.makeRequest(this.API_URL, false, 'post', dto);
  }

  static update(id: number, dto: UpdateReservationDTO): Promise<ReservationInterface> {
    return this.makeRequest(`${this.API_URL}/${id}`, false, 'patch', dto);
  }

  static delete(id: number): Promise<void> {
    return this.makeRequest(`${this.API_URL}/${id}`, false, 'delete');
  }

  static canManageReservation(status: ReservationStatus): boolean {
    return status === 'pending' || status === 'confirmed';
  }
}
