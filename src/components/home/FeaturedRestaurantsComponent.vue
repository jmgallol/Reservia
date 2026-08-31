<script setup lang="ts">
// Imports
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { ArrowRight, MapPin } from 'lucide-vue-next';

import StarRatingComponent from '@/components/restaurant/StarRatingComponent.vue';

import { RestaurantService } from '@/services/RestaurantService';

// Props
interface Props {
  selectedCategory?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectedCategory: '',
});

// Computed
const displayedRestaurants = computed(() => {
  if (props.selectedCategory) {
    return RestaurantService.getRestaurantsByCategory(props.selectedCategory);
  }
  return RestaurantService.getFeaturedRestaurants(4);
});
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-stone-800 tracking-tight">
          {{
            props.selectedCategory
              ? `Restaurantes: ${props.selectedCategory}`
              : 'Restaurantes Destacados'
          }}
        </h2>
        <p class="text-stone-500 text-sm md:text-base mt-1">
          {{
            props.selectedCategory
              ? `Explorando las mejores opciones de cocina ${props.selectedCategory.toLowerCase()}`
              : 'Los lugares mejor valorados por nuestra comunidad gastronómica'
          }}
        </p>
      </div>

      <RouterLink
        to="/restaurants"
        class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A3D2B] hover:text-[#C8552A] transition-colors self-start md:self-auto"
      >
        <span>Ver todos los restaurantes</span>
        <ArrowRight class="w-4 h-4" />
      </RouterLink>
    </div>

    <!-- Restaurants Grid -->
    <div
      v-if="displayedRestaurants.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <article
        v-for="restaurant in displayedRestaurants"
        :key="restaurant.id"
        class="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
      >
        <!-- Image Container -->
        <div class="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            :src="restaurant.imageUrl"
            :alt="restaurant.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <!-- Category Badge -->
          <span
            class="absolute top-3 left-3 bg-[#1A3D2B]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
          >
            {{ restaurant.category }}
          </span>
        </div>

        <!-- Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3
              class="font-bold text-lg text-stone-800 line-clamp-1 group-hover:text-[#1A3D2B] transition-colors"
            >
              {{ restaurant.name }}
            </h3>

            <!-- Location -->
            <div class="flex items-center gap-1.5 text-stone-500 text-xs mt-1.5 mb-3">
              <MapPin class="w-3.5 h-3.5 text-[#C8552A] shrink-0" />
              <span class="truncate">{{ restaurant.city }} · {{ restaurant.address }}</span>
            </div>

            <!-- Rating with StarRating component -->
            <div class="flex items-center gap-2 mb-4">
              <StarRatingComponent :rating="restaurant.rating ?? 5" :readonly="true" :size="16" />
              <span class="text-xs font-bold text-stone-700">
                {{ restaurant.rating?.toFixed(1) ?? '5.0' }}
              </span>
              <span v-if="restaurant.reviewCount" class="text-xs text-stone-400">
                ({{ restaurant.reviewCount }})
              </span>
            </div>
          </div>

          <!-- Action -->
          <RouterLink
            :to="{ name: 'restaurants', query: { id: restaurant.id } }"
            class="w-full py-2.5 px-4 rounded-xl text-center text-sm font-semibold bg-[#FAF8F4] text-[#1A3D2B] border border-stone-200 hover:bg-[#C8552A] hover:text-white hover:border-[#C8552A] transition-all duration-200 block"
          >
            Reservar mesa
          </RouterLink>
        </div>
      </article>
    </div>

    <!-- Empty state if no restaurants in category -->
    <div
      v-else
      class="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500"
    >
      <p class="text-base font-semibold text-stone-700">
        No encontramos restaurantes en esta categoría.
      </p>
      <p class="text-sm mt-1">Prueba seleccionando otra categoría gastronómica.</p>
    </div>
  </section>
</template>
