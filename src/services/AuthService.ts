import type { UserInterface } from '@/interfaces/UserInterface';

import { useAuthStore } from '@/stores/authStore';

export class AuthService {
  static getUsers(): UserInterface[] {
    const store = useAuthStore();
    return store.users;
  }

  static login(email: string, password: string): UserInterface | undefined {
    const users = AuthService.getUsers();
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      const store = useAuthStore();
      store.login(user);
    }
    return user;
  }

  static logout(): void {
    const store = useAuthStore();
    store.logout();
  }

  static getCurrentUser(): UserInterface | null {
    const store = useAuthStore();
    return store.currentUser;
  }

  static isAuthenticated(): boolean {
    const store = useAuthStore();
    return store.isAuthenticated();
  }
}
