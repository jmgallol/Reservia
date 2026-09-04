<script setup lang="ts">
// External imports
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import StarRatingComponent from '@/components/restaurant/StarRatingComponent.vue';

import type { RestaurantInterface, RestaurantPriceLevel } from '@/interfaces/RestaurantInterface';

import { RestaurantService } from '@/services/RestaurantService';
import { StringFormatUtil } from '@/utils/StringFormatUtil';

// Reactive state
const searchQuery = ref('');
const selectedCity = ref('Todas');
const selectedCategory = ref('Todas');
const selectedPrice = ref<RestaurantPriceLevel | 'Todos'>('Todos');
const selectedRating = ref<number | 'Todas'>('Todas');
const router = useRouter();

// Computed
const allRestaurants = computed(() => RestaurantService.getAll());

const filteredRestaurants = computed<RestaurantInterface[]>(() => {
  const normalizedSearchQuery = StringFormatUtil.normalizeSearchText(searchQuery.value);

  return allRestaurants.value.filter((restaurant) => {
    const minimumRating = selectedRating.value;
    const priceLevel = selectedPrice.value;
    const matchesSearch =
      normalizedSearchQuery === '' ||
      StringFormatUtil.normalizeSearchText(restaurant.name).includes(normalizedSearchQuery) ||
      StringFormatUtil.normalizeSearchText(restaurant.city).includes(normalizedSearchQuery) ||
      StringFormatUtil.normalizeSearchText(restaurant.category).includes(normalizedSearchQuery);
    const matchesCity =
      selectedCity.value === 'Todas' ||
      restaurant.city.toLowerCase() === selectedCity.value.toLowerCase();
    const matchesCategory =
      selectedCategory.value === 'Todas' ||
      restaurant.category.toLowerCase() === selectedCategory.value.toLowerCase();
    const matchesPrice = priceLevel === 'Todos' || restaurant.priceLevel === priceLevel;
    const matchesRating =
      minimumRating === 'Todas' ||
      (restaurant.rating !== undefined && restaurant.rating >= minimumRating);
    return matchesSearch && matchesCity && matchesCategory && matchesPrice && matchesRating;
  });
});

// Selectors
const cities = computed<string[]>(() => [
  'Todas',
  ...Array.from(new Set(allRestaurants.value.map((restaurant) => restaurant.city))).sort((a, b) =>
    a.localeCompare(b),
  ),
]);

const categories = computed<string[]>(() => [
  'Todas',
  ...Array.from(new Set(allRestaurants.value.map((restaurant) => restaurant.category))).sort(
    (a, b) => a.localeCompare(b),
  ),
]);

const priceOptions: { label: string; value: RestaurantPriceLevel | 'Todos' }[] = [
  { label: 'Todos', value: 'Todos' },
  { label: '$', value: 1 },
  { label: '$$', value: 2 },
  { label: '$$$', value: 3 },
  { label: '$$$$', value: 4 },
];

const ratingOptions: { label: string; value: number | 'Todas' }[] = [
  { label: 'Todas', value: 'Todas' },
  { label: '4.0+', value: 4 },
  { label: '4.5+', value: 4.5 },
];

// Methods
function clearFilters(): void {
  searchQuery.value = '';
  selectedCity.value = 'Todas';
  selectedCategory.value = 'Todas';
  selectedPrice.value = 'Todos';
  selectedRating.value = 'Todas';
}

function handleViewDetails(id: number): void {
  router.push(`/restaurants/${id}`);
}

function handleReserve(id: number): void {
  router.push(`/restaurants/${id}`);
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FAF8F4] relative">
    <!-- Sidebar -->
    <SidebarComponent role="client" />

    <!-- Content column with persistent top header and scrollable body -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      <!-- Header -->
      <HeaderComponent class="shrink-0" />

      <!-- Main Page Content -->
      <main class="flex-1 px-8 pb-24 overflow-y-auto space-y-6">
        <!-- Filter Card matching Image 1 -->
        <div
          class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div class="flex flex-wrap items-center gap-6">
            <!-- Search input -->
            <div class="space-y-1">
              <label
                for="restaurant-search"
                class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
              >
                BÚSQUEDA
              </label>
              <input
                id="restaurant-search"
                v-model="searchQuery"
                type="search"
                placeholder="Buscar por nombre, ciudad o categoría"
                class="w-72 max-w-full px-3.5 py-2 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none placeholder:text-stone-400 hover:border-stone-400 focus:border-stone-400 transition-colors"
              />
            </div>

            <!-- City filter -->
            <div class="space-y-1">
              <label
                for="city-select"
                class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
              >
                CIUDAD
              </label>
              <select
                id="city-select"
                v-model="selectedCity"
                class="px-3.5 py-2 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none cursor-pointer hover:border-stone-400 transition-colors"
              >
                <option v-for="city in cities" :key="city" :value="city">
                  {{ city }}
                </option>
              </select>
            </div>

            <!-- Category filter -->
            <div class="space-y-1">
              <label
                for="category-select"
                class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
              >
                CATEGORÍA
              </label>
              <select
                id="category-select"
                v-model="selectedCategory"
                class="px-3.5 py-2 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none cursor-pointer hover:border-stone-400 transition-colors"
              >
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ cat }}
                </option>
              </select>
            </div>

            <!-- Price filter -->
            <div class="space-y-1">
              <label
                for="price-select"
                class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
              >
                PRECIO
              </label>
              <select
                id="price-select"
                v-model="selectedPrice"
                class="px-3.5 py-2 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none cursor-pointer hover:border-stone-400 transition-colors"
              >
                <option v-for="option in priceOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Rating filter -->
            <div class="space-y-1">
              <label
                for="rating-select"
                class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
              >
                CALIFICACIÓN
              </label>
              <select
                id="rating-select"
                v-model="selectedRating"
                class="px-3.5 py-2 bg-[#FAF8F4] border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none cursor-pointer hover:border-stone-400 transition-colors"
              >
                <option v-for="option in ratingOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Clear filters -->
            <button
              type="button"
              class="self-end px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
              @click="clearFilters"
            >
              Limpiar
            </button>
          </div>

          <!-- Counter badge -->
          <span class="text-xs font-semibold text-stone-400">
            <strong class="text-stone-800">{{ filteredRestaurants.length }}</strong> resultados
          </span>
        </div>

        <!-- Restaurants Grid matching Image 1 -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <article
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.id"
            class="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200"
          >
            <!-- Image with Category Badge -->
            <div class="relative h-48 w-full bg-stone-100 overflow-hidden">
              <img
                :src="restaurant.imageUrl"
                :alt="restaurant.name"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span
                class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#122318]/90 backdrop-blur-xs text-white border border-white/20"
              >
                {{ restaurant.category }}
              </span>
            </div>

            <!-- Details -->
            <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h2 class="text-lg font-bold text-stone-900 tracking-tight font-heading">
                  {{ restaurant.name }}
                </h2>

                <div class="flex items-center gap-3 text-xs text-stone-500 mt-1">
                  <span>📍 {{ restaurant.city }}</span>
                  <span>·</span>
                  <span>🕒 12:00–22:00</span>
                </div>

                <div class="flex items-center gap-2 mt-2">
                  <StarRatingComponent
                    :rating="restaurant.rating ?? 4.8"
                    :readonly="true"
                    :size="14"
                  />
                  <span class="text-xs font-bold text-stone-700">
                    {{ restaurant.rating ?? 4.8 }}
                  </span>
                </div>
              </div>

              <!-- Buttons -->
              <div class="grid grid-cols-2 gap-2.5 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  class="py-2.5 px-3 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer text-center"
                  @click="handleViewDetails(restaurant.id)"
                >
                  Ver detalles
                </button>
                <button
                  type="button"
                  class="py-2.5 px-3 rounded-full bg-[#C8552A] hover:bg-[#b54a22] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer text-center"
                  @click="handleReserve(restaurant.id)"
                >
                  Reservar
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  </div>
</template>
