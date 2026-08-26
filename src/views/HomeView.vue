<script setup lang="ts">
// Imports
import MainSection from '@/components/home/MainSection.vue';
import ClientHeader from '@/components/layout/ClientHeader.vue';
import PublicHeader from '@/components/layout/PublicHeader.vue';

import { AuthService } from '@/services/AuthService';

// Computed
const isAuthenticated = () => AuthService.isAuthenticated();
</script>

<template>
  <div class="min-h-screen bg-[#FAF8F4]">
    <!-- Header -->
    <ClientHeader v-if="isAuthenticated()" />
    <PublicHeader v-else />

    <!-- Main Section -->
    <MainSection />
  </div>
</template>
