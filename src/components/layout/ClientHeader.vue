<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { AuthService } from '@/services/AuthService';
import { getInitials } from '@/utils/getInitials';

// Selectors — static, defined at module level (created once, not per instance)
const navItems = [
  { label: 'Restaurantes', to: '/restaurantes' },
  { label: 'Mis Reservas', to: '/mis-reservas' },
];

// Variables
const route = useRoute();
const router = useRouter();

// Reactive state
const showUserMenu = ref(false);

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());

const userInitials = computed(() =>
  currentUser.value ? getInitials(currentUser.value.name) : '?',
);

const userName = computed(() => currentUser.value?.name ?? 'Usuario');

// Methods
async function handleLogout(): Promise<void> {
  showUserMenu.value = false;
  AuthService.logoutUser();
  await router.push('/auth');
}
</script>

<template>
  <!-- Client header -->
  <header class="w-full bg-white border-b border-stone-200 px-6 py-3">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/restaurantes" class="flex items-center gap-2 no-underline">
        <img src="@/assets/images/logo.png" alt="Reservia logo" class="h-10 w-auto" />
        <span class="text-[18px] font-bold tracking-tight leading-none">
          <span class="text-[#1A3D2B]">Reserv</span><span class="text-[#E8A020]">ia</span>
        </span>
      </RouterLink>

      <!-- Navigation -->
      <nav class="flex items-center gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150"
          :class="
            route.path === item.to
              ? 'bg-[#1A3D2B] text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          "
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- User section -->
      <div class="relative flex items-center gap-3">
        <!-- Avatar + name -->
        <button
          type="button"
          class="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0"
          @click="showUserMenu = !showUserMenu"
        >
          <div
            class="w-9 h-9 rounded-full bg-[#1A3D2B] flex items-center justify-center text-white text-sm font-semibold shrink-0"
          >
            {{ userInitials }}
          </div>
          <span class="text-sm font-medium text-stone-800 hidden sm:block">{{ userName }}</span>
        </button>

        <!-- Logout button -->
        <button
          type="button"
          class="flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors p-1"
          aria-label="Cerrar sesión"
          @click="handleLogout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
