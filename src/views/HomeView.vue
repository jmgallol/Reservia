<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';

import BenefitsSectionComponent from '@/components/home/BenefitsSectionComponent.vue';
import CategorySectionComponent from '@/components/home/CategorySectionComponent.vue';
import FeaturedRestaurantsComponent from '@/components/home/FeaturedRestaurantsComponent.vue';
import MainSectionComponent from '@/components/home/MainSectionComponent.vue';
import AppFooterComponent from '@/components/layout/AppFooterComponent.vue';
import ClientHeaderComponent from '@/components/layout/ClientHeaderComponent.vue';
import PublicHeaderComponent from '@/components/layout/PublicHeaderComponent.vue';

import { AuthService } from '@/services/AuthService';

// Reactive state
const selectedCategory = ref('');

// Computed
const isAuthenticated = computed(() => AuthService.isAuthenticated());

// Methods
function handleCategorySelect(category: string): void {
  selectedCategory.value = category;
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF8F4] flex flex-col justify-between">
    <div>
      <!-- Header -->
      <ClientHeaderComponent v-if="isAuthenticated" />
      <PublicHeaderComponent v-else />

      <!-- Main & Search Section -->
      <MainSectionComponent />

      <!-- Categories Section -->
      <CategorySectionComponent
        :selected-category="selectedCategory"
        @select-category="handleCategorySelect"
      />

      <!-- Featured Restaurants Grid -->
      <FeaturedRestaurantsComponent :selected-category="selectedCategory" />

      <!-- Benefits Section -->
      <BenefitsSectionComponent />
    </div>

    <!-- Footer -->
    <AppFooterComponent />
  </div>
</template>
