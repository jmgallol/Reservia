<script setup lang="ts">
// Imports
import { ref } from 'vue';

import BaseModal from '@/components/common/BaseModal.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import ClientHeader from '@/components/layout/ClientHeader.vue';

import type { StatusType } from '@/interfaces/StatusType';

import { AuthService } from '@/services/AuthService';

// Reactive state
const showModal = ref(false);

// Computed
const isAuthenticated = () => AuthService.isAuthenticated();

// Selectors
const reservationStatuses: StatusType[] = ['pending', 'confirmed', 'completed', 'cancelled'];
const restaurantStatuses: StatusType[] = ['active', 'inactive'];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <ClientHeader v-if="isAuthenticated()" />
    <PublicHeader v-else />

    <!-- Main section -->
    <MainSection />

    <!-- Component -->
    <div class="max-w-2xl mx-auto p-8 space-y-6">
      <!-- StatusBadge -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">StatusBadge</h2>
        <div class="space-y-3">
          <div class="flex flex-wrap gap-3">
            <StatusBadge v-for="status in reservationStatuses" :key="status" :status="status" />
          </div>
          <div class="flex flex-wrap gap-3">
            <StatusBadge v-for="status in restaurantStatuses" :key="status" :status="status" />
          </div>
        </div>
      </div>

      <!-- BaseModal demo -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-1">BaseModal</h2>
        <p class="text-sm text-gray-500 mb-4">
          Controlado con <code class="bg-gray-100 px-1 rounded">v-model</code>, overlay con blur y
          botón de cierre.
        </p>
        <button
          class="bg-green-700 text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-green-800 transition"
          @click="showModal = true"
        >
          Abrir modal
        </button>
      </div>
    </div>

    <!-- BaseModal -->
    <BaseModal v-model="showModal">
      <p class="text-sm text-gray-400 py-4 text-center">Aquí va el contenido de Isabel.</p>
    </BaseModal>
  </div>
</template>
