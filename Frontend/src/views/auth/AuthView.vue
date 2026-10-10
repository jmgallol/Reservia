<script setup lang="ts">
// External imports
import { ref } from 'vue';

// Internal imports
import LoginComponent from '@/components/common/auth/LoginComponent.vue';
import RegisterComponent from '@/components/common/auth/RegisterComponent.vue';

// Variables
const currentTab = ref<'login' | 'register'>('login');

// Methods
function handleRegistered() {
  // Cuando se registra exitosamente, volver al login
  currentTab.value = 'login';
}
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

        <!-- Toggles -->
        <div class="flex bg-stone-100 rounded-xl p-1 mb-6">
          <button
            @click="currentTab = 'login'"
            class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors"
            :class="
              currentTab === 'login'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            "
          >
            Iniciar Sesión
          </button>
          <button
            @click="currentTab = 'register'"
            class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors"
            :class="
              currentTab === 'register'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            "
          >
            Registrarse
          </button>
        </div>

        <!-- Form panel -->
        <div class="mt-4">
          <LoginComponent v-if="currentTab === 'login'" />
          <RegisterComponent v-else @registered="handleRegistered" />
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
