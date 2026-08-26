<script setup lang="ts">
// Imports
import AdminSidebar from '@/components/layout/AdminSidebar.vue';
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main content -->
    <main class="flex-1 p-8">
      <h1 class="text-2xl font-bold text-gray-800">Panel de administración</h1>
      <p class="text-gray-500 mt-2">Selecciona una opción del menú lateral.</p>
    </main>
  </div>
</template>
