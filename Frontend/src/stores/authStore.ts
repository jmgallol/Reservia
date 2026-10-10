// External imports
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

// Internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export const useAuthStore = defineStore('user', () => {
  const savedUser = localStorage.getItem('currentUser');
  const currentUser = ref<UserInterface | null>(savedUser ? JSON.parse(savedUser) : null);

  watch(
    currentUser,
    (newUser) => {
      if (newUser) {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    },
    { deep: true },
  );

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
    login,
    logout,
    isAuthenticated,
  };
});
