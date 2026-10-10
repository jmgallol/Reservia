<script setup lang="ts">
// External imports
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// Internal imports
import { AuthService } from '@/services/AuthService';
import { RestaurantService } from '@/services/RestaurantService';

// Props
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: undefined,
    subtitle: undefined,
  },
);

// Variables
const route = useRoute();

// Reactive variables
const restaurantName = ref('Mi Restaurante');

onMounted(async () => {
  const user = AuthService.getCurrentUser();
  if (user?.restaurantId) {
    const restaurant = await RestaurantService.getById(user.restaurantId);
    if (restaurant) {
      restaurantName.value = restaurant.name;
    }
  }
});

// Computed
const headerText = computed(() => {
  if (props.title) {
    return {
      title: props.title,
      subtitle: props.subtitle ?? '',
    };
  }

  let title = (route.meta.title as string) || 'Reservia';
  const subtitle = (route.meta.subtitle as string) || '';

  if (route.name === 'admin-dashboard') {
    title = `Dashboard — ${restaurantName.value}`;
  }

  return { title, subtitle };
});
</script>

<template>
  <!-- Unified Top Header for Client and Admin Views -->
  <header class="w-full bg-[#FAF8F4] px-8 py-6 flex items-center justify-between">
    <div>
      <h1
        class="text-2xl md:text-[26px] font-bold text-stone-900 tracking-tight leading-tight font-heading"
      >
        {{ headerText.title }}
      </h1>
      <p v-if="headerText.subtitle" class="text-stone-500 text-xs md:text-sm font-normal mt-1">
        {{ headerText.subtitle }}
      </p>
    </div>

    <!-- Right Side Actions -->
    <div class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </header>
</template>
