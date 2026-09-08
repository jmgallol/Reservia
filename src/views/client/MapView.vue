<script setup lang="ts">
// External imports
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { RestaurantService } from '@/services/RestaurantService';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';

// Variables
let mapInstance: L.Map | null = null;
const restaurantMarkers = new Map<number, L.Marker>();
const router = useRouter();

// Reactive variables
const mapContainerRef = ref<HTMLDivElement | null>(null);

// Computed
const allRestaurants = computed(() => RestaurantService.getAll());

const medellinRestaurants = computed<RestaurantInterface[]>(() =>
  allRestaurants.value.filter((restaurant) => restaurant.city.toLowerCase() === 'medellín'),
);

// Methods
function getAverageRating(restaurant: RestaurantInterface): string {
  return RestaurantService.calculateAverageRating(restaurant.id).toFixed(1);
}

function createRestaurantPopup(restaurant: RestaurantInterface): HTMLElement {
  const container = document.createElement('div');
  container.className = 'space-y-2 text-sm text-stone-700';

  const name = document.createElement('h3');
  name.className = 'font-bold text-stone-900';
  name.textContent = restaurant.name;

  const category = document.createElement('p');
  category.textContent = restaurant.category;

  const rating = document.createElement('p');
  rating.textContent = `Calificación promedio: ${RestaurantService.calculateAverageRating(restaurant.id).toFixed(1)}`;

  const detailButton = document.createElement('button');
  detailButton.type = 'button';
  detailButton.className = 'text-sm font-semibold text-[#8B4513] hover:text-[#6B3410]';
  detailButton.textContent = 'Ver restaurante';
  detailButton.addEventListener('click', () => {
    void router.push(`/restaurants/${restaurant.id}`);
  });

  container.append(name, category, rating, detailButton);

  return container;
}

function initializeMap(): void {
  if (!mapContainerRef.value || mapInstance) return;

  const map = L.map(mapContainerRef.value).setView([6.2442, -75.5812], 12);
  mapInstance = map;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  medellinRestaurants.value.forEach((restaurant) => {
    if (restaurant.latitude !== undefined && restaurant.longitude !== undefined) {
      const marker = L.marker([restaurant.latitude, restaurant.longitude], {
        title: restaurant.name,
      })
        .bindPopup(createRestaurantPopup(restaurant))
        .addTo(map);

      restaurantMarkers.set(restaurant.id, marker);
    }
  });
}

function selectRestaurant(restaurant: RestaurantInterface): void {
  if (!mapInstance || restaurant.latitude === undefined || restaurant.longitude === undefined) {
    return;
  }

  const marker = restaurantMarkers.get(restaurant.id);
  if (!marker) return;

  const coordinates: L.LatLngExpression = [restaurant.latitude, restaurant.longitude];
  mapInstance.setView(coordinates, 15);
  marker.openPopup();
}

// Lifecycle
onMounted(() => {
  initializeMap();
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  restaurantMarkers.clear();
});
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

        <div class="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside
            class="rounded-2xl border border-stone-200/80 bg-white shadow-xs overflow-hidden"
            aria-label="Lista de restaurantes en Medellín"
          >
            <div class="divide-y divide-stone-100">
              <button
                v-for="restaurant in medellinRestaurants"
                :key="restaurant.id"
                type="button"
                class="w-full px-5 py-4 text-left transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8552A] focus-visible:ring-inset"
                @click="selectRestaurant(restaurant)"
              >
                <span class="block text-sm font-bold text-stone-900">
                  {{ restaurant.name }}
                </span>
                <span class="mt-1 block text-xs font-medium text-stone-500">
                  {{ restaurant.category }}
                </span>
                <span class="mt-2 block text-xs font-semibold text-stone-700">
                  Calificación promedio: {{ getAverageRating(restaurant) }}
                </span>
              </button>
            </div>
          </aside>

          <div
            ref="mapContainerRef"
            class="min-h-[520px] rounded-2xl border border-stone-200/80 bg-white shadow-xs overflow-hidden"
            aria-label="Mapa de restaurantes en Medellín"
          />
        </div>
      </main>
    </div>
  </div>
</template>
