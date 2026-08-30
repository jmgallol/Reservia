<script setup lang="ts">
// Imports
import { ref } from 'vue';

import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import StatusBadgeComponent from '@/components/common/StatusBadgeComponent.vue';
import ClientHeaderComponent from '@/components/layout/ClientHeaderComponent.vue';

import type { ReservationStatus } from '@/interfaces/ReservationInterface';

// Reactive state
const showModal = ref(false);

// Selectors
const reservationStatuses: ReservationStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];
</script>

<template>
  <div class="min-h-screen bg-[#FAF8F4]">
    <!-- Client Header -->
    <ClientHeaderComponent />

    <!-- Content -->
    <main class="max-w-6xl mx-auto px-6 py-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-[#1A3D2B] font-heading">Mis Reservas</h1>
          <p class="text-stone-500 mt-1">Gestiona y consulta el estado de tus reservas</p>
        </div>

        <button
          class="px-5 py-2.5 bg-[#C8552A] hover:bg-[#b04820] text-white rounded-full text-sm font-semibold transition-colors duration-150 shadow-sm cursor-pointer"
          @click="showModal = true"
        >
          Nueva Reserva
        </button>
      </div>

      <!-- Status Badges Demo -->
      <div class="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm mb-6">
        <h2 class="text-lg font-semibold text-stone-800 mb-4">Estados de Reserva</h2>
        <div class="flex flex-wrap gap-3">
          <StatusBadgeComponent
            v-for="status in reservationStatuses"
            :key="status"
            :status="status"
          />
        </div>
      </div>
    </main>

    <!-- Modal Demo -->
    <BaseModalComponent v-model="showModal" title="Nueva Reserva">
      <p class="text-stone-600 text-sm">
        Aquí podrás seleccionar restaurante, fecha, hora y número de personas.
      </p>
      <template #footer>
        <button
          class="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-medium transition-colors"
          @click="showModal = false"
        >
          Cerrar
        </button>
      </template>
    </BaseModalComponent>
  </div>
</template>
