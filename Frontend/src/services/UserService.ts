// External imports
import axios from 'axios';

// Internal imports
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';

export class UserService {
  private static readonly API_URL = `${import.meta.env.VITE_API_URL}/users`;

  static async getAll(): Promise<UserInterface[]> {
    try {
      const { data } = await axios.get(this.API_URL);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getById(id: number): Promise<UserInterface | undefined> {
    try {
      const { data } = await axios.get(`${this.API_URL}/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  static async create(dto: CreateUserDTO): Promise<UserInterface | undefined> {
    try {
      const { data } = await axios.post(this.API_URL, dto);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
