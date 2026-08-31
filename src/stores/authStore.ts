import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { UserInterface } from '@/interfaces/UserInterface';

const SESSION_KEY = 'reservia_session';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserInterface | null>(loadSession());

  function loadSession(): UserInterface | null {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }

  function login(user: UserInterface): void {
    currentUser.value = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function logout(): void {
    currentUser.value = null;
    localStorage.removeItem(SESSION_KEY);
  }

  function isAuthenticated(): boolean {
    return currentUser.value !== null;
  }

  return {
    currentUser,
    login,
    logout,
    isAuthenticated,
  };
});
