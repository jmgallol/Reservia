// Internal imports
import { useAuthStore } from '@/stores/authStore';

export class UserService {
  static getNameById(id: number): string {
    const store = useAuthStore();
    const user = store.users.find((u) => u.id === id);
    return user?.name ?? 'Desconocido';
  }
}
