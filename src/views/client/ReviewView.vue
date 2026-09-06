<script setup lang="ts">
// Internal imports
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
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
        <div class="max-w-5xl mx-auto space-y-6">
          <!-- Empty State Card -->
          <div
            class="bg-white rounded-2xl p-12 border border-stone-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-3"
          >
            <div
              class="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 text-xl font-bold"
            >
              ★
            </div>
            <h3 class="text-base font-bold text-stone-800">
              No tienes reseñas publicadas
            </h3>
            <p class="text-stone-500 text-xs max-w-sm">
              Las reseñas y calificaciones que realices en tus restaurantes visitados aparecerán en esta sección.
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
