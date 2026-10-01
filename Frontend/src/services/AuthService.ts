// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

export class AuthService {
  // Getters
  static getCurrentUser(): UserInterface | null {
    return useAuthStore().currentUser;
  }

  static isAuthenticated(): boolean {
    return useAuthStore().isAuthenticated();
  }

  // Auth Methods
  static async login(email: string, password: string): Promise<UserInterface | undefined> {
    try {
      const { data } = await axios.post('http://localhost:3000/api/users/login', {
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
