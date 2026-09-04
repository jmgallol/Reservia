<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import RestaurantEditFormComponent from '@/components/restaurant/RestaurantEditFormComponent.vue';
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { AuthService } from '@/services/AuthService';
import { RestaurantService } from '@/services/RestaurantService';

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());

const restaurant = computed<RestaurantInterface | undefined>(() => {
  if (!currentUser.value?.restaurantId) return undefined;
  return RestaurantService.getById(currentUser.value.restaurantId);
});


</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Sidebar -->
    <SidebarComponent role="admin" />

    <!-- Content column with persistent top header and scrollable body -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Header -->
      <HeaderComponent class="shrink-0" />

      <!-- Main Page Content -->
      <main class="flex-1 px-8 pb-24 overflow-y-auto">
        <div class="max-w-4xl mx-auto space-y-6">
          <!-- Restaurant Hero Banner -->
          <section
            v-if="restaurant"
            class="relative rounded-2xl overflow-hidden h-52 md:h-56 shadow-sm"
          >
            <!-- Background Image -->
            <img
              :src="restaurant.imageUrl"
              :alt="restaurant.name"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- Dark gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <!-- Restaurant Info (bottom-left) -->
            <div class="absolute bottom-5 left-6">
              <h2 class="text-2xl md:text-3xl font-bold text-white font-heading tracking-tight drop-shadow-md">
                {{ restaurant.name }}
              </h2>

            </div>
          </section>

          <!-- Edit Information Form -->
          <RestaurantEditFormComponent v-if="restaurant" :restaurant="restaurant" />
        </div>
      </main>
    </div>
  </div>
</template>
