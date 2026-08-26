<script setup lang="ts">
// Imports
import { RouterLink, useRoute } from 'vue-router';

// Variables
const route = useRoute();

// Selectors
const navItems = [
  { label: 'Inicio', to: '/inicio' },
  { label: 'Restaurantes', to: '/restaurantes' },
  { label: 'Acerca de', to: '/acerca-de' },
];
</script>

<template>
  <!-- Public header -->
  <header class="w-full bg-white border-b border-stone-200 px-6 py-3">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/inicio" class="flex items-center gap-2 no-underline">
        <img src="@/assets/images/logo.png" alt="Reservia logo" class="h-10 w-auto" />
        <span class="text-[18px] font-bold tracking-tight leading-none">
          <span class="text-[#1A3D2B]">Reserv</span><span class="text-[#E8A020]">ia</span>
        </span>
      </RouterLink>

      <!-- Navigation -->
      <nav class="flex items-center gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150"
          :class="
            route.path === item.to
              ? 'bg-[#1A3D2B] text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          "
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- CTA -->
      <RouterLink
        to="/auth"
        class="px-5 py-2 rounded-full border border-stone-800 text-sm font-semibold text-stone-800 hover:bg-[#1A3D2B] hover:border-[#1A3D2B] hover:text-white transition-colors duration-150"
      >
        Iniciar sesión
      </RouterLink>
    </div>
  </header>
</template>
