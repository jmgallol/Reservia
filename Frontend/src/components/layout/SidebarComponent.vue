<script setup lang="ts">
// External imports
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

// Internal imports
import logoImage from '@/assets/images/logo.png';
import type { UserRole } from '@/interfaces/UserInterface';
import { AuthService } from '@/services/AuthService';
import { RestaurantService } from '@/services/RestaurantService';
import { StringFormatUtil } from '@/utils/StringFormatUtil';

// Props
const props = withDefaults(
  defineProps<{
    role?: UserRole;
  }>(),
  {
    role: undefined,
  },
);

// Variables
const route = useRoute();
const router = useRouter();

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());

const activeRole = computed<UserRole>(() => {
  if (props.role) return props.role;
  if (route.path.startsWith('/admin')) return 'admin';
  return currentUser.value?.role ?? 'client';
});

const isAdmin = computed(() => activeRole.value === 'admin');

const currentRestaurantName = ref('La Toscana');

onMounted(async () => {
  if (currentUser.value?.restaurantId) {
    const restaurant = await RestaurantService.getById(currentUser.value.restaurantId);
    if (restaurant) {
      currentRestaurantName.value = restaurant.name;
    }
  }
});

const userName = computed(() => {
  return currentUser.value?.name ?? '';
});

const userRoleLabel = computed(() => (isAdmin.value ? 'Administrador' : 'Cliente'));

const userInitials = computed(() => StringFormatUtil.getInitials(userName.value));

// Selectors
const clientNavItems = [
  { label: 'Restaurantes', to: '/restaurants', icon: 'fa-solid fa-utensils' },
  { label: 'Mapa', to: '/map', icon: 'fa-solid fa-location-dot' },
  { label: 'Mis Reservas', to: '/reservations', icon: 'fa-solid fa-calendar' },
  { label: 'Mis Reseñas', to: '/reviews', icon: 'fa-solid fa-comment' },
];

const adminNavItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: 'fa-solid fa-chart-pie' },
  { label: 'Mi Restaurante', to: '/admin/restaurant', icon: 'fa-solid fa-store' },
  { label: 'Reservas', to: '/admin/reservations', icon: 'fa-solid fa-calendar' },
  { label: 'Reseñas', to: '/admin/reviews', icon: 'fa-solid fa-comment' },
];

const currentNavItems = computed(() => (isAdmin.value ? adminNavItems : clientNavItems));

// Methods
async function handleLogout(): Promise<void> {
  AuthService.logout();
  await router.push('/auth');
}
</script>

<template>
  <!-- Unified sidebar for Client and Admin -->
  <aside
    class="flex flex-col w-64 h-screen shrink-0 bg-[#0E2016] text-white border-r border-[#1B3625] select-none z-20"
  >
    <!-- Brand Logo -->
    <div class="flex items-center gap-3 px-6 py-6">
      <img :src="logoImage" alt="Reservia Logo" class="w-10 h-10 object-contain rounded-xl" />
      <span class="text-xl font-bold tracking-tight text-white font-heading"> Reservia </span>
    </div>

    <!-- Admin Restaurant Sub-Badge (Only visible in Admin view) -->
    <div v-if="isAdmin" class="px-5 mb-3">
      <div
        class="bg-[#1C3024] border border-[#2B4B38] rounded-2xl px-4 py-2.5 text-center shadow-xs"
      >
        <p class="text-[11px] font-bold tracking-wider text-[#E8A020] uppercase">ADMINISTRADOR</p>
        <p class="text-xs text-stone-300 font-medium truncate mt-0.5">
          {{ currentRestaurantName }}
        </p>
      </div>
    </div>

    <!-- Navigation Menu Items -->
    <nav class="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
      <RouterLink
        v-for="item in currentNavItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-150"
        :class="
          route.path === item.to
            ? 'bg-[#1E3A2B] text-white shadow-sm font-semibold'
            : 'text-stone-400 hover:bg-[#162D20] hover:text-white'
        "
      >
        <i
          :class="[item.icon, route.path === item.to ? 'text-white' : 'text-stone-400']"
          style="font-size: 18px"
        ></i>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Bottom User Profile / Login -->
    <div class="p-5 border-t border-[#1B3625] shrink-0 space-y-3">
      <template v-if="currentUser">
        <div class="flex items-center gap-3">
          <!-- Avatar Initial -->
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs"
            :class="
              isAdmin
                ? 'bg-[#C8552A]'
                : 'bg-[#1E3A2B] text-emerald-300 border border-emerald-700/50'
            "
          >
            {{ userInitials }}
          </div>

          <!-- Name & Subtitle Role -->
          <div class="min-w-0 flex-1">
            <p class="text-sm font-bold text-white truncate leading-tight">
              {{ userName }}
            </p>
            <p class="text-xs text-stone-400 truncate mt-0.5">
              {{ userRoleLabel }}
            </p>
          </div>
        </div>

        <!-- Logout Button -->
        <button
          type="button"
          class="flex items-center gap-2 text-xs font-medium text-stone-400 hover:text-red-300 transition-colors pt-1 cursor-pointer"
          @click="handleLogout"
        >
          <i class="fa-solid fa-arrow-right-from-bracket text-[14px]"></i>
          <span>Cerrar sesión</span>
        </button>
      </template>
      <template v-else>
        <!-- Login Button -->
        <button
          type="button"
          class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#C8552A] hover:bg-[#b54a22] text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
          @click="router.push('/auth')"
        >
          Iniciar sesión
        </button>
      </template>
    </div>
  </aside>
</template>
