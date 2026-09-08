<script setup lang="ts">
// External imports
import { ref, watch } from 'vue';

// Internal imports
import type { ReservationInterface } from '@/interfaces/ReservationInterface';
import { ReservationService } from '@/services/ReservationService';
import BaseModalComponent from '@/components/common/BaseModalComponent.vue';

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
const form = ref({
  reservationDate: '',
  reservationTime: '',
  numberOfPeople: 1,
  specialRequest: '',
});
const editErrorMessage = ref('');

// Watchers
watch(
  () => props.reservation,
  (reservation) => {
    if (!reservation) return;

    form.value.reservationDate = reservation.reservationDate;
    form.value.reservationTime = reservation.reservationTime;
    form.value.numberOfPeople = reservation.numberOfPeople;
    form.value.specialRequest = reservation.specialRequest ?? '';
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
    form.value.reservationDate.trim() !== '' &&
    form.value.reservationTime.trim() !== '' &&
    Number.isInteger(form.value.numberOfPeople) &&
    form.value.numberOfPeople >= 1
  );
}

function handleSave(): void {
  if (!props.reservation) return;

  if (!isFormValid()) {
    editErrorMessage.value = 'Completa fecha, hora y número de personas válidos.';
    return;
  }

  ReservationService.updateReservation(props.reservation.id, {
    reservationDate: form.value.reservationDate,
    reservationTime: form.value.reservationTime,
    numberOfPeople: form.value.numberOfPeople,
    specialRequest: form.value.specialRequest.trim(),
  });

  emit('saved');
  closeModal();
}
</script>

<template>
  <BaseModalComponent
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <form class="space-y-5" @submit.prevent="handleSave">
      <div>
        <h2 class="text-lg font-bold text-stone-900 font-heading">Modificar reserva</h2>
        <p class="mt-1 text-xs text-stone-500">Actualiza los datos principales de tu reserva.</p>
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
          v-model="form.reservationDate"
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
          v-model="form.reservationTime"
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
          v-model.number="form.numberOfPeople"
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
          v-model="form.specialRequest"
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
