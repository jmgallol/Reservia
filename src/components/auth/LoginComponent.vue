<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Eye, EyeOff, Lock, Mail } from 'lucide-vue-next';

import { AuthService } from '@/services/AuthService';

// Variables
const router = useRouter();

// Reactive state
const email = ref('');
const errorMessage = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);

// Methods
async function handleLogin(): Promise<void> {
  errorMessage.value = '';

  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor completa todos los campos.';
    return;
  }

  const user = AuthService.loginAndSave(email.value, password.value);

  if (!user) {
    errorMessage.value = 'Correo o contraseña incorrectos.';
    return;
  }

  const destination = user.role === 'admin' ? '/admin/dashboard' : '/home';
  await router.push(destination);
}
</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-heading text-[28px] font-bold italic text-text-primary mb-1.5">
      Bienvenido de nuevo
    </h1>
    <p class="text-text-secondary text-sm mb-6">Ingresa tus credenciales para continuar</p>

    <div
      v-if="errorMessage"
      class="bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] px-3.5 py-2.5 rounded-[6px] text-[13px] mb-4"
    >
      {{ errorMessage }}
    </div>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="login-email"
        >CORREO ELECTRÓNICO</label
      >
      <div class="relative flex items-center">
        <Mail
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="login-email"
          v-model="email"
          type="email"
          placeholder="maria@email.com"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
      </div>
    </div>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="login-password"
        >CONTRASEÑA</label
      >
      <div class="relative flex items-center">
        <Lock
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="login-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
        <button
          type="button"
          class="absolute right-3.5 bg-transparent border-none text-text-secondary p-1 flex items-center justify-center opacity-60 cursor-pointer transition-opacity duration-150 hover:opacity-100"
          @click="showPassword = !showPassword"
        >
          <EyeOff v-if="showPassword" :size="18" />
          <Eye v-else :size="18" />
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between mb-6">
      <label class="flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer">
        <input
          v-model="rememberMe"
          type="checkbox"
          class="w-4 h-4 accent-green-dark cursor-pointer"
        />
        Recordarme
      </label>
      <a
        href="#"
        class="text-[13px] text-orange font-medium transition-colors duration-150 hover:text-orange-hover"
        >¿Olvidaste tu contraseña?</a
      >
    </div>

    <button
      class="w-full py-3.5 border-none rounded-full text-[15px] font-semibold text-white transition-all duration-250 mb-4 bg-green-dark hover:bg-green-medium hover:-translate-y-px hover:shadow-lg"
      @click="handleLogin"
    >
      Iniciar sesión
    </button>
  </div>
</template>
