<script setup lang="ts">
// External imports
import { SquarePen } from 'lucide-vue-next';
import { ref, watch } from 'vue';

// Internal imports
import type { RestaurantInterface } from '@/interfaces/RestaurantInterface';
import { RestaurantService } from '@/services/RestaurantService';

// Props & Emits
const props = defineProps<{
  restaurant: RestaurantInterface;
}>();

const emit = defineEmits<{
  (e: 'update', restaurant: RestaurantInterface): void;
}>();

// Reactive variables
const form = ref({
  name: '',
  address: '',
  city: '',
  category: '',
  openingTime: '',
  closingTime: '',
  description: '',
  imageUrl: '',
  latitude: 0,
  longitude: 0,
});

const saveSuccess = ref(false);

// Methods
function loadFormData(): void {
  form.value.name = props.restaurant.name;
  form.value.address = props.restaurant.address;
  form.value.city = props.restaurant.city;
  form.value.category = props.restaurant.category;
  form.value.openingTime = props.restaurant.openingTime ?? '';
  form.value.closingTime = props.restaurant.closingTime ?? '';
  form.value.description = props.restaurant.description ?? '';
  form.value.imageUrl = props.restaurant.imageUrl ?? '';
  form.value.latitude = props.restaurant.latitude ?? 0;
  form.value.longitude = props.restaurant.longitude ?? 0;
  saveSuccess.value = false;
}

async function handleSave(): Promise<void> {
  const updatedRestaurant: RestaurantInterface = {
    ...props.restaurant,
    name: form.value.name,
    address: form.value.address,
    city: form.value.city,
    category: form.value.category,
    openingTime: form.value.openingTime,
    closingTime: form.value.closingTime,
    description: form.value.description,
    imageUrl: form.value.imageUrl,
    latitude: Number(form.value.latitude),
    longitude: Number(form.value.longitude),
  };

  const result = await RestaurantService.update(updatedRestaurant);
  if (result) {
    saveSuccess.value = true;
    emit('update', result);
    setTimeout(() => {
      saveSuccess.value = false;
    }, 3000);
  }
}

function handleDiscard(): void {
  loadFormData();
}

// Watch for external restaurant changes (e.g. after save updates the store)
watch(
  () => props.restaurant,
  () => {
    loadFormData();
  },
  { immediate: true },
);
</script>

<template>
  <article class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 md:p-8 space-y-6">
    <!-- Card Header -->
    <div class="flex items-center gap-2">
      <SquarePen :size="20" class="text-stone-700" />
      <h3 class="text-lg font-bold text-stone-900 font-heading tracking-tight">
        Editar información
      </h3>
    </div>

    <!-- Form Fields -->
    <form class="space-y-5" @submit.prevent="handleSave">
      <!-- Nombre del restaurante -->
      <div class="space-y-1.5">
        <label
          for="restaurant-name"
          class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
        >
          Nombre del restaurante
        </label>
        <input
          id="restaurant-name"
          v-model="form.name"
          type="text"
          class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
          placeholder="Nombre del restaurante"
        />
      </div>

      <!-- Dirección -->
      <div class="space-y-1.5">
        <label
          for="restaurant-address"
          class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
        >
          Dirección
        </label>
        <input
          id="restaurant-address"
          v-model="form.address"
          type="text"
          class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
          placeholder="Dirección"
        />
      </div>

      <!-- Ciudad + Categoría (2 columns) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="space-y-1.5">
          <label
            for="restaurant-city"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Ciudad
          </label>
          <input
            id="restaurant-city"
            v-model="form.city"
            type="text"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
            placeholder="Ciudad"
          />
        </div>

        <div class="space-y-1.5">
          <label
            for="restaurant-category"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Categoría
          </label>
          <input
            id="restaurant-category"
            v-model="form.category"
            type="text"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
            placeholder="Categoría"
          />
        </div>
      </div>

      <!-- Hora de Apertura + Hora de Cierre (2 columns) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="space-y-1.5">
          <label
            for="restaurant-opening"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Hora de apertura
          </label>
          <input
            id="restaurant-opening"
            v-model="form.openingTime"
            type="text"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
            placeholder="Ej: 12:00 p.m."
          />
        </div>

        <div class="space-y-1.5">
          <label
            for="restaurant-closing"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Hora de cierre
          </label>
          <input
            id="restaurant-closing"
            v-model="form.closingTime"
            type="text"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
            placeholder="Ej: 10:00 p.m."
          />
        </div>
      </div>

      <!-- URL de Imagen -->
      <div class="space-y-1.5">
        <label
          for="restaurant-image"
          class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
        >
          URL de la Imagen
        </label>
        <input
          id="restaurant-image"
          v-model="form.imageUrl"
          type="url"
          class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <!-- Latitud + Longitud (2 columns) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="space-y-1.5">
          <label
            for="restaurant-lat"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Latitud (Mapa)
          </label>
          <input
            id="restaurant-lat"
            v-model="form.latitude"
            type="number"
            step="any"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
            placeholder="Ej: 6.2442"
          />
        </div>

        <div class="space-y-1.5">
          <label
            for="restaurant-lng"
            class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
          >
            Longitud (Mapa)
          </label>
          <input
            id="restaurant-lng"
            v-model="form.longitude"
            type="number"
            step="any"
            class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors"
            placeholder="Ej: -75.5812"
          />
        </div>
      </div>

      <!-- Descripción -->
      <div class="space-y-1.5">
        <label
          for="restaurant-description"
          class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
        >
          Descripción
        </label>
        <textarea
          id="restaurant-description"
          v-model="form.description"
          rows="3"
          class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-[#1A3D2B] focus:ring-1 focus:ring-[#1A3D2B]/20 transition-colors resize-none"
          placeholder="Descripción del restaurante"
        />
      </div>

      <!-- Action Buttons and Success Message -->
      <div class="flex items-center gap-3 pt-2">
        <button
          type="submit"
          class="px-6 py-2.5 bg-[#1A3D2B] text-white text-sm font-semibold rounded-xl hover:bg-[#153323] transition-colors cursor-pointer"
        >
          Guardar cambios
        </button>
        <button
          type="button"
          class="px-6 py-2.5 bg-white text-stone-700 text-sm font-semibold rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
          @click="handleDiscard"
        >
          Descartar
        </button>
        
        <span v-if="saveSuccess" class="text-sm font-semibold text-green-600 ml-4 animate-pulse">
          ¡Cambios guardados con éxito!
        </span>
      </div>
    </form>
  </article>
</template>
