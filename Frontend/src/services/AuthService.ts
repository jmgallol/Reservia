// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

export class AuthService {
  static getCurrentUser(): UserInterface | null {
    return useAuthStore().currentUser;
  }

  static isAuthenticated(): boolean {
    return useAuthStore().isAuthenticated();
  }

  static async login(email: string, password: string): Promise<UserInterface | undefined> {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        email,
        password,
      });

      if (data) {
        useAuthStore().login(data);
        return data;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return undefined;
    }
    return undefined;
  }

  static logout(): void {
    useAuthStore().logout();
  }
}
