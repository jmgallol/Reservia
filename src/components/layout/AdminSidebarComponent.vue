<script setup lang="ts">
// Imports
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import {
  Calendar,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Store,
  UtensilsCrossed,
} from 'lucide-vue-next';

import { AuthService } from '@/services/AuthService';
import { StringFormatUtil } from '@/utils/StringFormatUtil';

// Variables
const route = useRoute();
const router = useRouter();

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());

const adminName = computed(() => currentUser.value?.name ?? 'Administrador');
const adminEmail = computed(() => currentUser.value?.email ?? 'admin@reservia.com');
const adminInitials = computed(() =>
  currentUser.value ? StringFormatUtil.getInitials(currentUser.value.name) : 'A',
);

// Selectors
const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Mi Restaurante', to: '/admin/restaurant', icon: Store },
  { label: 'Reservas', to: '/admin/reservations', icon: Calendar },
  { label: 'Reseñas', to: '/admin/reviews', icon: MessageSquare },
];

// Methods
async function handleLogout(): Promise<void> {
  AuthService.logoutUser();
  await router.push('/auth');
}
</script>

<template>
  <!-- Admin sidebar fixed to viewport height -->
  <aside
    class="flex flex-col w-64 h-screen shrink-0 bg-[#122318] text-white border-r border-[#1e3827] z-20"
  >
    <!-- Restaurant header -->
    <div class="flex items-center gap-3 px-5 py-5 border-b border-[#1e3827]">
      <div
        class="w-9 h-9 rounded-xl bg-[#1A3D2B] flex items-center justify-center shrink-0 border border-[#2d583e]"
      >
        <UtensilsCrossed :size="18" class="text-white" />
      </div>
      <div class="min-w-0">
        <p class="text-sm font-bold text-white truncate">La Toscana</p>
        <p class="text-xs text-stone-400 truncate">Restaurante</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150"
        :class="
          route.path === item.to
            ? 'bg-[#1A3D2B] text-white shadow-sm'
            : 'text-stone-300 hover:bg-[#1a3424] hover:text-white'
        "
      >
        <component
          :is="item.icon"
          :size="18"
          :class="route.path === item.to ? 'text-white' : 'text-stone-400'"
        />
        {{ item.label }}
      </RouterLink>
    </nav>

    <!-- Admin info + logout -->
    <div class="px-3 py-4 border-t border-[#1e3827] shrink-0">
      <div class="flex items-center gap-3 px-3 py-2 mb-1">
        <!-- Avatar -->
        <div
          class="w-8 h-8 rounded-full bg-[#1A3D2B] border border-[#2d583e] flex items-center justify-center text-white text-xs font-semibold shrink-0"
        >
          {{ adminInitials }}
        </div>
        <!-- Name & email -->
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-white truncate">{{ adminName }}</p>
          <p class="text-xs text-stone-400 truncate">{{ adminEmail }}</p>
        </div>
      </div>

      <!-- Logout -->
      <button
        type="button"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-300 hover:bg-[#2e1c1c] hover:text-red-400 transition-colors duration-150 cursor-pointer"
        @click="handleLogout"
      >
        <LogOut :size="18" />
        Cerrar sesión
      </button>
    </div>
  </aside>
</template>
