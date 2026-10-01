// External imports
import axios from 'axios';

// Internal imports
import type { CreateReservationDTO } from '@/dtos/CreateReservationDTO';
import type { ReservationInterface, ReservationStatus } from '@/interfaces/ReservationInterface';

export class ReservationService {
  private static readonly API_URL = 'http://localhost:3000/api/reservations';

  static async getAll(): Promise<ReservationInterface[]> {
    try {
      const { data } = await axios.get(this.API_URL);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getById(id: number): Promise<ReservationInterface | undefined> {
    try {
      const { data } = await axios.get(`${this.API_URL}/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async getByStatus(status: ReservationStatus): Promise<ReservationInterface[]> {
    try {
      const { data } = await axios.get(`${this.API_URL}/status?status=${status}`);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getByRestaurantId(restaurantId: number): Promise<ReservationInterface[]> {
    try {
      const { data } = await axios.get(`${this.API_URL}/restaurant/${restaurantId}`);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getByUserId(userId: number): Promise<ReservationInterface[]> {
    try {
      const { data } = await axios.get(`${this.API_URL}/user/${userId}`);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async filterByClient(userId: number, status: string): Promise<ReservationInterface[]> {
    try {
      const reservations = await this.getByUserId(userId);
      return reservations.filter((r) => status === 'Todas' || r.status === status);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async filter(restaurantId: number, status: string, peopleRange: string): Promise<ReservationInterface[]> {
    try {
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
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async create(dto: CreateReservationDTO): Promise<ReservationInterface | undefined> {
    try {
      const { data } = await axios.post(this.API_URL, dto);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async updateStatus(id: number, status: ReservationStatus): Promise<ReservationInterface | undefined> {
    try {
      const { data } = await axios.patch(`${this.API_URL}/${id}`, { status });
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async updateReservation(id: number, updates: Partial<ReservationInterface>): Promise<ReservationInterface | undefined> {
    try {
      const { data } = await axios.patch(`${this.API_URL}/${id}`, updates);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  
  static async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.API_URL}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  static canManageReservation(status: ReservationStatus): boolean {
    return status === 'pending' || status === 'confirmed';
  }
}
