<script setup lang="ts">
// Internal imports
import LoginComponent from '@/components/auth/LoginComponent.vue';
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
    <!-- Left panel: Form -->
    <div
      class="flex items-start justify-center px-4 py-6 md:px-8 md:py-12 overflow-y-auto bg-white"
    >
      <div class="w-full max-w-[420px]">
        <!-- Logo -->
        <div class="flex items-center gap-2.5 mb-8">
          <img src="@/assets/images/logo.png" alt="Reservia" class="h-9 w-auto" />
          <span class="text-[20px] font-bold tracking-tight">
            <span class="text-[#1A3D2B]">Reserv</span><span class="text-[#E8A020]">ia</span>
          </span>
        </div>

        <!-- Form panel -->
        <div class="mt-8">
          <LoginComponent />
        </div>
      </div>
    </div>

    <!-- Right panel: Image -->
    <div
      class="relative hidden md:block bg-cover bg-center bg-[#3A3A3A]"
      style="background-image: url('/src/assets/images/auth-restaurant.avif')"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10 flex items-end p-12"
      >
        <div class="text-white">
          <span class="block text-xs font-semibold tracking-widest text-[#E8A020] mb-4"
            >LA EXPERIENCIA TE ESPERA</span
          >
          <h2 class="font-heading text-[38px] font-bold leading-tight text-white mb-6">
            Reserva tu mesa<br />en los mejores<br />restaurantes
          </h2>
          <div class="flex gap-2">
            <span class="w-3 h-3 rounded-full bg-[#1A3D2B]"></span>
            <span class="w-3 h-3 rounded-full bg-[#C8552A]"></span>
            <span class="w-3 h-3 rounded-full bg-[#E8A020]"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
