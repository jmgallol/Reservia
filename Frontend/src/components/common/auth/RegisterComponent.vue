<script setup lang="ts">
// External imports
import { Eye, EyeOff, Lock, Mail, MapPin, Phone, Store, User } from 'lucide-vue-next';
import { ref } from 'vue';

// Internal imports
import type { UserRole } from '@/interfaces/UserInterface';
import { RestaurantService } from '@/services/RestaurantService';
import { UserService } from '@/services/UserService';

// Props / Emits
const emit = defineEmits<{
  (e: 'registered', email: string): void;
}>();

// Reactive variables
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'client' as UserRole,
  restaurantName: '',
  restaurantAddress: '',
  restaurantCity: '',
  restaurantCategory: '',
});
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);
const isLoading = ref(false);

// Methods
async function handleRegister(): Promise<void> {
  errorMessage.value = '';
  successMessage.value = '';

  if (!form.value.name || !form.value.email || !form.value.password || !form.value.phone) {
    errorMessage.value = 'Por favor completa todos los campos obligatorios.';
    return;
  }

  if (form.value.role === 'admin') {
    if (!form.value.restaurantName || !form.value.restaurantAddress || !form.value.restaurantCity || !form.value.restaurantCategory) {
      errorMessage.value = 'Por favor completa todos los datos de tu restaurante.';
      return;
    }
  }

  isLoading.value = true;
  
  const createDto = {
    name: form.value.name,
    email: form.value.email,
    password: form.value.password,
    phone: form.value.phone,
    role: form.value.role,
  };

  try {
    const newUser = await UserService.create(createDto);

    if (form.value.role === 'admin') {
      const restaurantDto = {
        name: form.value.restaurantName,
        description: 'Bienvenidos a nuestro restaurante.',
        address: form.value.restaurantAddress,
        city: form.value.restaurantCity,
        category: form.value.restaurantCategory,
        openingTime: '08:00',
        closingTime: '22:00',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        latitude: 0,
        longitude: 0, 
        adminId: newUser.id,
      };
      await RestaurantService.create(restaurantDto);
    }

    isLoading.value = false;
    successMessage.value = 'Cuenta creada exitosamente. Ahora puedes iniciar sesión.';
    
    setTimeout(() => {
      emit('registered', form.value.email);
    }, 1500);

  } catch (error: any) {
    isLoading.value = false;
    errorMessage.value = error.message || 'Error al registrar el usuario.';
  }
}
</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-heading text-[28px] font-bold italic text-text-primary mb-1.5">
      Crear una cuenta
    </h1>
    <p class="text-text-secondary text-sm mb-6">Regístrate para empezar a reservar</p>

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
      <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
        ¿ERES CLIENTE O ADMINISTRADOR?
      </label>
      <div class="flex gap-4">
        <label class="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input type="radio" v-model="form.role" value="client" class="accent-green-dark cursor-pointer w-4 h-4" />
          Cliente
        </label>
        <label class="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input type="radio" v-model="form.role" value="admin" class="accent-green-dark cursor-pointer w-4 h-4" />
          Dueño de restaurante (Admin)
        </label>
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
        NOMBRE COMPLETO
      </label>
      <div class="relative flex items-center">
        <User class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none" :size="18" />
        <input
          v-model="form.name"
          type="text"
          placeholder="Juan Pérez"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
        CORREO ELECTRÓNICO
      </label>
      <div class="relative flex items-center">
        <Mail class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none" :size="18" />
        <input
          v-model="form.email"
          type="email"
          placeholder="juan@email.com"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
        TELÉFONO
      </label>
      <div class="relative flex items-center">
        <Phone class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none" :size="18" />
        <input
          v-model="form.phone"
          type="tel"
          placeholder="+57 300 000 0000"
          class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
        />
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
        CONTRASEÑA
      </label>
      <div class="relative flex items-center">
        <Lock class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none" :size="18" />
        <input
          v-model="form.password"
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

    <!-- Campos Dinámicos del Restaurante (Sólo si es Admin) -->
    <template v-if="form.role === 'admin'">
      <h2 class="font-heading text-[18px] font-bold text-text-primary mt-4 mb-4 border-b border-border pb-2">
        Datos de tu Restaurante
      </h2>
      
      <div class="mb-4">
        <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
          NOMBRE DEL RESTAURANTE
        </label>
        <div class="relative flex items-center">
          <Store class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none" :size="18" />
          <input
            v-model="form.restaurantName"
            type="text"
            placeholder="La Toscana"
            class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
          DIRECCIÓN
        </label>
        <div class="relative flex items-center">
          <MapPin class="absolute left-3.5 text-text-secondary opacity-60 pointer-events-none" :size="18" />
          <input
            v-model="form.restaurantAddress"
            type="text"
            placeholder="Calle 123 #45-67"
            class="w-full py-3.5 pr-3.5 pl-11 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
            CIUDAD
          </label>
          <input
            v-model="form.restaurantCity"
            type="text"
            placeholder="Medellín"
            class="w-full py-3.5 px-3.5 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
          />
        </div>
        <div>
          <label class="block text-[11px] font-semibold tracking-[0.5px] text-text-label mb-1.5">
            CATEGORÍA
          </label>
          <input
            v-model="form.restaurantCategory"
            type="text"
            placeholder="Italiana"
            class="w-full py-3.5 px-3.5 border border-border rounded-[10px] text-sm text-text-primary bg-white transition-colors duration-150 outline-none placeholder:text-text-placeholder focus:border-border-focus"
          />
        </div>
      </div>
    </template>

    <div class="mt-4 mb-4">
    </div>

    <button
      :disabled="isLoading"
      class="w-full py-3.5 border-none rounded-full text-[15px] font-semibold text-white transition-all duration-250 mb-4 bg-green-dark hover:bg-green-medium hover:-translate-y-px hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      @click="handleRegister"
    >
      {{ isLoading ? 'Creando cuenta...' : 'Crear cuenta' }}
    </button>
  </div>
</template>
