// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/authStore';
import { BaseService } from '@/services/BaseService';

export class AuthService extends BaseService {
  static getCurrentUser(): UserInterface | null {
    return useAuthStore().currentUser;
  }

  static isAuthenticated(): boolean {
    return useAuthStore().isAuthenticated();
  }

  static async login(email: string, password: string): Promise<UserInterface> {
    const data = await this.makeRequest(
      `${import.meta.env.VITE_API_URL}/users/login`,
      false,
      'post',
      { email, password },
    );

    if (data) {
      useAuthStore().login(data);
    }

    return data;
  }

  static logout(): void {
    useAuthStore().logout();
  }
}
