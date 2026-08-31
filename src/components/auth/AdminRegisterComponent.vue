<script setup lang="ts">
// Imports
import { ref } from 'vue';

import { ArrowRight, Eye, EyeOff, Info, Lock, Mail, Phone, User } from 'lucide-vue-next';

import { AuthService } from '@/services/AuthService';

// Reactive state
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const restaurantName = ref('');
const restaurantAddress = ref('');
const restaurantCity = ref('Bogotá');
const restaurantCategory = ref('Italiana');
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);

// Selectors
const cities: string[] = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Santa Marta',
  'Pereira',
];

const categories: string[] = [
  'Italiana',
  'Mexicana',
  'Japonesa',
  'Colombiana',
  'Francesa',
  'Peruana',
  'China',
  'Americana',
  'Mediterránea',
  'Fusión',
];

// Methods
function handleRegister(): void {
  errorMessage.value = '';
  successMessage.value = '';

  if (
    !name.value ||
    !email.value ||
    !phone.value ||
    !password.value ||
    !restaurantName.value ||
    !restaurantAddress.value
  ) {
    errorMessage.value = 'Por favor completa todos los campos.';
    return;
  }

  if (password.value.length < 8) {
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres.';
    return;
  }

  try {
    const result = AuthService.registerAdmin({
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      restaurantName: restaurantName.value,
      restaurantAddress: restaurantAddress.value,
      restaurantCity: restaurantCity.value,
      restaurantCategory: restaurantCategory.value,
    });

    successMessage.value = '¡Registro exitoso! Redirigiendo...';
    alert(
      `¡Bienvenido, ${result.user.name}! Tu restaurante "${result.restaurant.name}" ha sido registrado.`,
    );
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Ocurrió un error al registrar.';
  }
}
</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-heading text-[28px] font-bold italic text-text-primary mb-1.5">
      Registro de administrador
    </h1>
    <p class="text-text-secondary text-sm mb-4">Crea tu cuenta y asocia tu restaurante</p>

    <div
      class="flex gap-3 items-start bg-alert-bg border border-alert-border rounded-[10px] px-4 py-3.5 mb-6"
    >
      <Info class="text-gold shrink-0 mt-px" :size="20" />
      <p class="text-[13px] text-alert-text leading-snug">
        Cada administrador solo puede gestionar
        <strong class="underline font-bold">un único restaurante</strong>. Durante el registro
        deberás crear o asociar tu establecimiento.
      </p>
    </div>

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

    <!-- Datos del administrador -->
    <h2 class="font-body text-xs font-bold tracking-[0.5px] text-text-primary mb-4 mt-2">
      DATOS DEL ADMINISTRADOR
    </h2>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="admin-name"
        >NOMBRE COMPLETO</label
      >
      <div class="relative flex items-center">
        <User
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="admin-name"
          v-model="name"
          type="text"
          placeholder="Juan Pérez"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
      </div>
    </div>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="admin-email"
        >CORREO</label
      >
      <div class="relative flex items-center">
        <Mail
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="admin-email"
          v-model="email"
          type="email"
          placeholder="juan@restaurante.co"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
      </div>
    </div>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="admin-phone"
        >TELÉFONO</label
      >
      <div class="relative flex items-center">
        <Phone
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="admin-phone"
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
        for="admin-password"
        >CONTRASEÑA</label
      >
      <div class="relative flex items-center">
        <Lock
          class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none"
          :size="18"
        />
        <input
          id="admin-password"
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

    <!-- Datos del restaurante -->
    <h2 class="font-body text-xs font-bold tracking-[0.5px] text-text-primary mb-4 mt-2">
      DATOS DEL RESTAURANTE
    </h2>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="admin-restaurant-name"
        >NOMBRE DEL RESTAURANTE</label
      >
      <input
        id="admin-restaurant-name"
        v-model="restaurantName"
        type="text"
        placeholder="Ej: La Toscana"
        class="w-full py-3.5 px-3.5 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
      />
    </div>

    <div class="mb-4">
      <label
        class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
        for="admin-restaurant-address"
        >DIRECCIÓN</label
      >
      <input
        id="admin-restaurant-address"
        v-model="restaurantAddress"
        type="text"
        placeholder="Ej: Cra 7 #67-29"
        class="w-full py-3.5 px-3.5 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="mb-4">
        <label
          class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
          for="admin-restaurant-city"
          >CIUDAD</label
        >
        <select
          id="admin-restaurant-city"
          v-model="restaurantCity"
          class="w-full p-3.5 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none cursor-pointer appearance-auto focus:border-border-focus"
        >
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label
          class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5"
          for="admin-restaurant-category"
          >CATEGORÍA</label
        >
        <select
          id="admin-restaurant-category"
          v-model="restaurantCategory"
          class="w-full p-3.5 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none cursor-pointer appearance-auto focus:border-border-focus"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
    </div>

    <button
      class="w-full py-3.5 border-none rounded-full text-[15px] font-semibold text-white transition-all duration-250 mt-2 flex items-center justify-center gap-2 bg-orange hover:bg-orange-hover hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(196,114,58,0.3)]"
      @click="handleRegister"
    >
      <span>Continuar configuración</span>
      <ArrowRight :size="18" />
    </button>
  </div>
</template>
