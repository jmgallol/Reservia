// Internal imports
import { useAuthStore } from '@/stores/authStore';

export class UserService {
  static getNameById(id: number): string {
    const user = useAuthStore().users.find((u) => u.id === id);

    return user?.name ?? 'Desconocido';
  }
}
