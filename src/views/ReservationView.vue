<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SidebarComponent from '@/components/layout/SidebarComponent.vue';
import StatusBadgeComponent from '@/components/common/StatusBadgeComponent.vue';
import type { ReservationStatus } from '@/interfaces/ReservationInterface';

// Reactive state
const showModal = ref(false);

// Selectors
const reservationStatuses: ReservationStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];
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
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-stone-900 tracking-tight">
                Control de reservaciones
              </h2>
              <p class="text-stone-500 text-xs mt-1">
                Consulta y gestiona el estado de tus reservas actuales
              </p>
            </div>

            <button
              type="button"
              class="px-5 py-2.5 bg-[#C8552A] hover:bg-[#b04820] text-white rounded-full text-xs font-semibold transition-colors duration-150 shadow-sm cursor-pointer"
              @click="showModal = true"
            >
              Nueva Reserva
            </button>
          </div>

          <!-- Status Badges Card -->
          <div class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
            <h3 class="text-sm font-bold text-stone-800 mb-3">Estados de Reserva</h3>
            <div class="flex flex-wrap gap-3">
              <StatusBadgeComponent
                v-for="status in reservationStatuses"
                :key="status"
                :status="status"
              />
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal Demo -->
    <BaseModalComponent v-model="showModal" title="Nueva Reserva">
      <p class="text-stone-600 text-sm">
        Aquí podrás seleccionar restaurante, fecha, hora y número de personas.
      </p>
      <template #footer>
        <button
          type="button"
          class="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          @click="showModal = false"
        >
          Cerrar
        </button>
      </template>
    </BaseModalComponent>
  </div>
</template>
