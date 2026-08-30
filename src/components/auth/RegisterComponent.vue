<script setup lang="ts">
// Imports
import { ref } from 'vue';

import { Eye, EyeOff, Lock, Mail, Phone, UserPlus } from 'lucide-vue-next';

import { AuthService } from '@/services/AuthService';

// Emits
const emit = defineEmits<{
  switchTab: [tab: string];
  registered: [];
}>();

// Reactive state
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Methods
function handleRegister(): void {
  errorMessage.value = '';
  successMessage.value = '';

  if (!name.value || !email.value || !phone.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Por favor completa todos los campos.';
    return;
  }

  if (password.value.length < 8) {
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    AuthService.registerClient({
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    });

    successMessage.value = '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.';

    name.value = '';
    email.value = '';
    phone.value = '';
    password.value = '';
    confirmPassword.value = '';

    setTimeout(() => {
      emit('switchTab', 'login');
    }, 2000);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Ocurrió un error al registrar.';
  }
}
</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-heading text-[28px] font-bold italic text-text-primary mb-1.5">Crear cuenta</h1>
    <p class="text-text-secondary text-sm mb-6">Regístrate para explorar y reservar restaurantes</p>

    <div
      v-if="errorMessage"
      class="bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] px-3.5 py-2.5 rounded-[6px] text-[13px] mb-4"
    >
      {{ errorMessage }}
    </div>

    <div
      v-if="successMessage"
      class="bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] px-3.5 py-2.5 rounded-[6px] text-[13px] mb-4"
    >
      {{ successMessage }}
    </div>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="register-name"
        >NOMBRE COMPLETO</label
      >
      <div class="relative flex items-center">
        <UserPlus
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="register-name"
          v-model="name"
          type="text"
          placeholder="María García"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
      </div>
    </div>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="register-email"
        >CORREO ELECTRÓNICO</label
      >
      <div class="relative flex items-center">
        <Mail
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="register-email"
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
        for="register-phone"
        >TELÉFONO</label
      >
      <div class="relative flex items-center">
        <Phone
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="register-phone"
          v-model="phone"
          type="tel"
          placeholder="+57 300 000 0000"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
      </div>
    </div>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="register-password"
        >CONTRASEÑA</label
      >
      <div class="relative flex items-center">
        <Lock
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="register-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Mínimo 8 caracteres"
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

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="register-confirm-password"
        >CONFIRMAR CONTRASEÑA</label
      >
      <div class="relative flex items-center">
        <Lock
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="register-confirm-password"
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Repite tu contraseña"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
        <button
          type="button"
          class="absolute right-3.5 bg-transparent border-none text-text-secondary p-1 flex items-center justify-center opacity-60 cursor-pointer transition-opacity duration-150 hover:opacity-100"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <EyeOff v-if="showConfirmPassword" :size="18" />
          <Eye v-else :size="18" />
        </button>
      </div>
    </div>

    <button
      class="w-full py-3.5 border-none rounded-full text-[15px] font-semibold text-white transition-all duration-250 mt-2 bg-orange hover:bg-orange-hover hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(196,114,58,0.3)]"
      @click="handleRegister"
    >
      Crear cuenta
    </button>
  </div>
</template>
