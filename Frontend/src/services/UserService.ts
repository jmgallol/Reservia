// External imports
import axios from 'axios';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export class UserService {
  private static readonly API_URL = 'http://localhost:3000/api/users';

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

  static async create(user: Omit<UserInterface, 'id'>): Promise<UserInterface | undefined> {
    try {
      const { data } = await axios.post(this.API_URL, user);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

}
