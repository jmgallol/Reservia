<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Search } from 'lucide-vue-next';

// Variables
const router = useRouter();

// Reactive state
const searchQuery = ref('');

// Methods
function handleSearch(): void {
  const query = searchQuery.value.trim();
  router.push({ name: 'restaurants', query: query ? { q: query } : undefined });
}
</script>

<template>
  <!-- Main hero section -->
  <section class="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
    <!-- Background image -->
    <img
      src="@/assets/images/home.jpg"
      alt="Restaurante"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Centered dark gradient overlay for text readability -->
    <div class="absolute inset-0 bg-black/55 backdrop-brightness-90" />

    <!-- Content (centered) -->
    <div class="relative z-10 px-6 py-16 max-w-3xl mx-auto flex flex-col items-center text-center">
      <!-- Title -->
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-sm"
      >
        Encuentra el restaurante<br />
        perfecto para cada ocasión
      </h1>

      <!-- Subtitle -->
      <p
        class="text-white/85 text-sm sm:text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto font-normal"
      >
        Explora los mejores restaurantes, reserva tu mesa y comparte tu experiencia gastronómica.
      </p>

      <!-- Search bar + CTA button (centered) -->
      <form
        class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl mx-auto"
        @submit.prevent="handleSearch"
      >
        <!-- Search input -->
        <div
          class="flex items-center gap-3 bg-white rounded-full px-5 py-3.5 shadow-lg w-full flex-1 border border-stone-200 focus-within:ring-2 focus-within:ring-[#1A3D2B]"
        >
          <Search :size="19" class="text-stone-400 shrink-0" />
          <input
            id="hero-search"
            v-model="searchQuery"
            type="text"
            placeholder="Nombre, ciudad o categoría..."
            class="flex-1 text-sm text-stone-800 outline-none placeholder:text-stone-400 bg-transparent"
          />
        </div>

        <!-- Explore button in Terracotta -->
        <button
          type="submit"
          class="bg-[#C8552A] hover:bg-[#B24820] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-lg transition-all duration-150 hover:shadow-xl hover:-translate-y-0.5 shrink-0 w-full sm:w-auto"
        >
          Explorar
        </button>
      </form>
    </div>
  </section>
</template>
