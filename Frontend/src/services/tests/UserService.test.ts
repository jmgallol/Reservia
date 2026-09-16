import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { UserService } from '../UserService';

describe('UserService', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should return "Desconocido" for a non-existent user', () => {
    const store = useAuthStore();
    store.users = []; // empty users
    expect(UserService.getNameById(999)).toBe('Desconocido');
  });

  it('should return the correct user name for an existing user', () => {
    const store = useAuthStore();
    // mock a user
    store.users = [
      { id: 1, name: 'Juan Perez', email: 'juan@test.com', password: '123' } as any
    ];
    
    expect(UserService.getNameById(1)).toBe('Juan Perez');
  });
});
