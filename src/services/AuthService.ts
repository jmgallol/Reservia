// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/authStore';

export class AuthService {
  // Getters
  static getUsers(): UserInterface[] {
    return useAuthStore().users;
  }

  static getCurrentUser(): UserInterface | null {
    return useAuthStore().currentUser;
  }

  static isAuthenticated(): boolean {
    return useAuthStore().isAuthenticated();
  }

  // Auth Methods
  static login(email: string, password: string): UserInterface | undefined {
    const user = AuthService.getUsers().find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      useAuthStore().login(user);
    }

    return user;
  }

  static logout(): void {
    useAuthStore().logout();
  }
}
