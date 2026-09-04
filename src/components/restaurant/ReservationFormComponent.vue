<script setup lang="ts">
// External imports
import { Minus, Plus } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal imports
import type { CreateReservationDTO } from '@/dtos/CreateReservationDTO';
import { AuthService } from '@/services/AuthService';
import { ReservationService } from '@/services/ReservationService';

// Props
interface Props {
  restaurantId: number;
}

const props = defineProps<Props>();

// Variables
const router = useRouter();

// Reactive state
const reservationDate = ref('2026-07-20');
const reservationTime = ref('19:30');
const guests = ref(2);

// Methods
const handleConfirmReservation = () => {
  const user = AuthService.getCurrentUser();

  const reservationDTO: CreateReservationDTO = {
    restaurantId: props.restaurantId,
    userId: user?.id ?? 0,
    clientName: user?.name,
    clientEmail: user?.email,
    date: reservationDate.value,
    time: reservationTime.value,
    guests: guests.value,
  };

  ReservationService.create(reservationDTO);
  router.push('/reservations');
}

function decreaseGuests(): void {
  if (guests.value > 1) guests.value--;
}

function increaseGuests(): void {
  if (guests.value < 20) guests.value++;
}
</script>

<template>
  <div class="bg-white rounded-[24px] border border-stone-200/80 shadow-xs p-8 sticky top-6">
    <h2 class="text-lg font-bold font-heading text-stone-900 mb-6">Hacer una reserva</h2>

    <div class="space-y-5">
      <!-- Date -->
      <div>
        <label class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2"
          >Fecha</label
        >
        <input
          v-model="reservationDate"
          type="date"
          class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[14px] font-medium text-stone-800 outline-none focus:border-stone-400 transition-colors"
        />
      </div>

      <!-- Time -->
      <div>
        <label class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2"
          >Hora</label
        >
        <select
          v-model="reservationTime"
          class="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-[14px] font-medium text-stone-800 outline-none focus:border-stone-400 transition-colors appearance-none cursor-pointer"
        >
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="19:00">19:00</option>
          <option value="19:30">19:30</option>
          <option value="20:00">20:00</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
        </select>
      </div>

      <!-- Guests -->
      <div>
        <label class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2"
          >Personas</label
        >
        <div class="inline-flex items-center border border-stone-200 rounded-full px-1 py-1">
          <button
            type="button"
            class="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
            @click="decreaseGuests"
          >
            <Minus :size="14" stroke-width="3" />
          </button>
          <span class="w-10 text-center text-[15px] font-bold text-stone-800">{{ guests }}</span>
          <button
            type="button"
            class="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
            @click="increaseGuests"
          >
            <Plus :size="14" stroke-width="3" />
          </button>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="button"
      class="w-full mt-5 py-3.5 bg-[#C8552A] hover:bg-[#b54a22] text-white rounded-xl text-[15px] font-bold transition-all shadow-sm active:scale-[0.98]"
      @click="handleConfirmReservation"
    >
      Confirmar reserva
    </button>
  </div>
</template>
