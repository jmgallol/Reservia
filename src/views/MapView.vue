<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';

import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';

import { RestaurantService } from '@/services/RestaurantService';

// Computed
const allRestaurants = computed(() => RestaurantService.getAll());

const medellinRestaurants = computed<RestaurantInterface[]>(() =>
  allRestaurants.value.filter((restaurant) => restaurant.city.toLowerCase() === 'medellín'),
);
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Sidebar -->
    <SidebarComponent role="client" />

    <!-- Content column with persistent top header and scrollable body -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Header -->
      <HeaderComponent
        class="shrink-0"
        title="Mapa de restaurantes"
        subtitle="Explora restaurantes disponibles en Medellín"
      />

      <!-- Main Page Content -->
      <main class="flex-1 px-8 pb-24 overflow-y-auto space-y-6">
        <div
          class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h2 class="text-lg font-bold text-stone-900 tracking-tight font-heading">
              Restaurantes en Medellín
            </h2>
            <p class="text-stone-500 text-xs mt-1">
              Ubicaciones listas para integrarse con Google Maps
            </p>
          </div>

          <span class="text-xs font-semibold text-stone-400">
            <strong class="text-stone-800">{{ medellinRestaurants.length }}</strong> restaurantes
            disponibles
          </span>
        </div>

        <section
          class="min-h-[520px] rounded-2xl border border-dashed border-stone-300 bg-white shadow-xs flex items-center justify-center text-center px-6"
        >
          <div class="space-y-2">
            <p class="text-xl font-bold text-stone-900 tracking-tight font-heading">
              Mapa de restaurantes en Medellín
            </p>
            <p class="text-sm text-stone-500">
              Próximamente este espacio mostrará el mapa interactivo.
            </p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
