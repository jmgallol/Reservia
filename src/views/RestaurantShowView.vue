<script setup lang="ts">
// External imports
import { ChevronLeft, Clock, MapPin } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Internal imports
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import ReservationFormComponent from '@/components/restaurant/ReservationFormComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import StarRatingComponent from '@/components/restaurant/StarRatingComponent.vue';
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { RestaurantService } from '@/services/RestaurantService';

// Variables
const route = useRoute();

// Computed
const restaurant = computed<RestaurantInterface | null>(() => {
  const id = Number(route.params.id);
  return RestaurantService.getById(id) || null;
});
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Sidebar -->
    <SidebarComponent role="client" />

    <!-- Content column -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Header -->
      <HeaderComponent class="shrink-0" />

      <!-- Main Page Content -->
      <main v-if="restaurant" class="flex-1 px-8 pb-24 overflow-y-auto">
        <!-- Back Link -->
        <div class="flex items-center text-sm font-medium text-stone-500 mb-6">
          <ChevronLeft :size="16" class="mr-1" />
          <router-link to="/restaurants" class="hover:text-stone-800 transition-colors"
            >Volver a restaurantes</router-link
          >
        </div>

        <!-- Hero Image -->
        <div
          class="relative w-full h-64 md:h-[340px] rounded-[24px] overflow-hidden mb-8 shadow-sm"
        >
          <img
            :src="restaurant.imageUrl"
            :alt="restaurant.name"
            class="w-full h-full object-cover"
          />
          <span
            class="absolute top-4 right-4 px-4 py-1.5 rounded-full text-[13px] font-bold bg-emerald-500 text-white shadow-sm"
          >
            Abierto ahora
          </span>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <!-- Left Col: Details -->
          <div
            class="bg-white rounded-[24px] border border-stone-200/80 shadow-xs p-8 flex flex-col"
          >
            <div class="flex items-start justify-between mb-1">
              <h1 class="text-3xl font-bold font-heading text-stone-900 tracking-tight">
                {{ restaurant.name }}
              </h1>
              <div class="flex items-center gap-1 text-[#E8A020]">
                <StarRatingComponent :rating="restaurant.rating ?? 5" :readonly="true" :size="18" />
              </div>
            </div>

            <p class="text-[15px] text-[#C8552A] font-semibold mb-6">{{ restaurant.category }}</p>

            <div class="flex flex-wrap items-center gap-3 mb-8">
              <div
                class="bg-[#F8F7F4] text-stone-600 rounded-full px-5 py-2.5 flex items-center gap-2.5 text-[13px] font-medium border border-stone-100"
              >
                <MapPin :size="16" class="text-[#C8552A]" />
                <span>{{ restaurant.city }} — {{ restaurant.address }}</span>
              </div>
              <div
                class="bg-[#F8F7F4] text-stone-600 rounded-full px-5 py-2.5 flex items-center gap-2.5 text-[13px] font-medium border border-stone-100"
              >
                <Clock :size="16" class="text-[#E8A020]" />
                <span>12:00 – 22:00</span>
              </div>
            </div>

            <div class="border-t border-stone-100 pt-6 mt-auto">
              <p class="text-stone-600 text-[15px] leading-relaxed">
                {{ restaurant.description }}
              </p>
            </div>
          </div>

          <!-- Right Col: Reservation Form -->
          <ReservationFormComponent :restaurant-id="restaurant.id" />
        </div>
      </main>
    </div>
  </div>
</template>
