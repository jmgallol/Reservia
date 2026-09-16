import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { AuthService } from '../AuthService';
import type { UserInterface } from '@/interfaces/UserInterface';

describe('AuthService', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should return null when no user is logged in', () => {
    expect(AuthService.getCurrentUser()).toBeNull();
    expect(AuthService.isAuthenticated()).toBe(false);
  });

  it('should login a valid user successfully', () => {
    const store = useAuthStore();
    const testUser = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123', phone: '123', role: 'client' } as UserInterface;
    store.users = [testUser];

    const loggedUser = AuthService.login('test@example.com', 'password123');
    
    expect(loggedUser).toEqual(testUser);
    expect(AuthService.getCurrentUser()).toEqual(testUser);
    expect(AuthService.isAuthenticated()).toBe(true);
  });

  it('should return undefined and not login with invalid credentials', () => {
    const store = useAuthStore();
    const testUser = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123', phone: '123', role: 'client' } as UserInterface;
    store.users = [testUser];

    const loggedUser = AuthService.login('test@example.com', 'wrongpassword');
    
    expect(loggedUser).toBeUndefined();
    expect(AuthService.getCurrentUser()).toBeNull();
    expect(AuthService.isAuthenticated()).toBe(false);
  });

  it('should logout correctly', () => {
    const store = useAuthStore();
    const testUser = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123', phone: '123', role: 'client' } as UserInterface;
    store.users = [testUser];

    AuthService.login('test@example.com', 'password123');
    expect(AuthService.isAuthenticated()).toBe(true);

    AuthService.logout();
    expect(AuthService.isAuthenticated()).toBe(false);
    expect(AuthService.getCurrentUser()).toBeNull();
  });
});
