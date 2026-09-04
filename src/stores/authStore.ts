import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { UserInterface } from '@/interfaces/UserInterface';

export const useAuthStore = defineStore('user', () => {
  const currentUser = ref<UserInterface | null>(null);
  const users = ref<UserInterface[]>([]);

  function login(user: UserInterface): void {
    currentUser.value = user;
  }

  function logout(): void {
    currentUser.value = null;
  }

  function isAuthenticated(): boolean {
    return currentUser.value !== null;
  }

  return {
    currentUser,
    users,
    login,
    logout,
    isAuthenticated,
  };
});
