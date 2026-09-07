<script setup lang="ts">
// Imports
import { ref, watch } from 'vue';

import BaseModalComponent from '@/components/common/BaseModalComponent.vue';

import type { ReservationInterface } from '@/interfaces/ReservationInterface';

import { ReservationService } from '@/services/ReservationService';

// Props & Emits
const props = defineProps<{
  modelValue: boolean;
  reservation: ReservationInterface | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  saved: [];
}>();

// Reactive variables
const editReservationDate = ref('');
const editReservationTime = ref('');
const editNumberOfPeople = ref(1);
const editSpecialRequest = ref('');
const editErrorMessage = ref('');

// Watchers
watch(
  () => props.reservation,
  (reservation) => {
    if (!reservation) return;

    editReservationDate.value = reservation.reservationDate;
    editReservationTime.value = reservation.reservationTime;
    editNumberOfPeople.value = reservation.numberOfPeople;
    editSpecialRequest.value = reservation.specialRequest ?? '';
    editErrorMessage.value = '';
  },
);

// Methods
function closeModal(): void {
  emit('update:modelValue', false);
  editErrorMessage.value = '';
}

function isFormValid(): boolean {
  return (
    editReservationDate.value.trim() !== '' &&
    editReservationTime.value.trim() !== '' &&
    Number.isInteger(editNumberOfPeople.value) &&
    editNumberOfPeople.value >= 1
  );
}

function handleSave(): void {
  if (!props.reservation) return;

  if (!isFormValid()) {
    editErrorMessage.value = 'Completa fecha, hora y número de personas válidos.';
    return;
  }

  ReservationService.updateReservation(props.reservation.id, {
    reservationDate: editReservationDate.value,
    reservationTime: editReservationTime.value,
    numberOfPeople: editNumberOfPeople.value,
    specialRequest: editSpecialRequest.value.trim(),
  });

  emit('saved');
  closeModal();
}
</script>

<template>
  <BaseModalComponent :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <form class="space-y-5" @submit.prevent="handleSave">
      <div>
        <h2 class="text-lg font-bold text-stone-900 font-heading">Modificar reserva</h2>
        <p class="mt-1 text-xs text-stone-500">
          Actualiza los datos principales de tu reserva.
        </p>
      </div>

      <p
        v-if="editErrorMessage"
        class="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
      >
        {{ editErrorMessage }}
      </p>

      <div class="space-y-1.5">
        <label
          for="edit-reservation-date"
          class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
        >
          Fecha
        </label>
        <input
          id="edit-reservation-date"
          v-model="editReservationDate"
          type="date"
          class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
        />
      </div>

      <div class="space-y-1.5">
        <label
          for="edit-reservation-time"
          class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
        >
          Hora
        </label>
        <input
          id="edit-reservation-time"
          v-model="editReservationTime"
          type="time"
          class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
        />
      </div>

      <div class="space-y-1.5">
        <label
          for="edit-reservation-people"
          class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
        >
          Personas
        </label>
        <input
          id="edit-reservation-people"
          v-model.number="editNumberOfPeople"
          type="number"
          min="1"
          class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
        />
      </div>

      <div class="space-y-1.5">
        <label
          for="edit-special-request"
          class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider"
        >
          Solicitud especial
        </label>
        <textarea
          id="edit-special-request"
          v-model="editSpecialRequest"
          rows="3"
          class="w-full px-4 py-3 bg-[#FAF8F4] border border-stone-200 rounded-xl text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors resize-none"
        />
      </div>

      <div class="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          class="px-4 py-2 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
          @click="closeModal"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded-xl bg-[#C8552A] text-sm font-semibold text-white hover:bg-[#b54a22] transition-colors cursor-pointer"
        >
          Guardar
        </button>
      </div>
    </form>
  </BaseModalComponent>
</template>
