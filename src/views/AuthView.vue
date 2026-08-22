<script setup lang="ts">
import { ref } from 'vue';
import AuthTabs from '@/components/auth/AuthTabs.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import AdminRegisterForm from '@/components/auth/AdminRegisterForm.vue';

const activeTab = ref('login');

function handleSwitchTab(tab: string): void {
  activeTab.value = tab;
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
    <!-- Left panel: Form -->
    <div class="flex items-start justify-center px-4 py-6 md:px-8 md:py-12 overflow-y-auto bg-white">
      <div class="w-full max-w-[420px]">
        <!-- Logo -->
        <div class="flex items-center gap-2.5 mb-8">
          <div class="w-10 h-10 bg-green-dark rounded-full flex items-center justify-center text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>
          </div>
          <span class="font-heading text-[22px] font-bold text-text-primary">Reservia</span>
        </div>

        <!-- Tabs -->
        <AuthTabs :active-tab="activeTab" @update:active-tab="handleSwitchTab" />

        <!-- Form panels -->
        <div class="mt-8">
          <LoginForm
            v-if="activeTab === 'login'"
            @switch-tab="handleSwitchTab"
          />
          <RegisterForm
            v-if="activeTab === 'register'"
            @switch-tab="handleSwitchTab"
          />
          <AdminRegisterForm
            v-if="activeTab === 'admin'"
          />
        </div>
      </div>
    </div>

    <!-- Right panel: Image -->
    <div class="relative hidden md:block bg-cover bg-center bg-[#3A3A3A]" style="background-image: url('/src/assets/images/auth-restaurant.avif');">
      <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10 flex items-end p-12">
        <div class="text-white">
          <span class="block text-xs font-semibold tracking-widest text-gold mb-4">LA EXPERIENCIA TE ESPERA</span>
          <h2 class="font-heading text-[38px] font-bold leading-tight text-white mb-6">
            Reserva tu mesa<br />en los mejores<br />restaurantes
          </h2>
          <div class="flex gap-2">
            <span class="w-3 h-3 rounded-full bg-green-dark"></span>
            <span class="w-3 h-3 rounded-full bg-orange"></span>
            <span class="w-3 h-3 rounded-full bg-gold"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
