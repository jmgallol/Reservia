<script setup lang="ts">
// Imports
import { computed } from 'vue';

import { Check, Eye, X } from 'lucide-vue-next';

import BaseTableComponent from '@/components/common/BaseTableComponent.vue';
import StatusBadgeComponent from '@/components/common/StatusBadgeComponent.vue';

import { ReservationService } from '@/services/ReservationService';

// Props
interface Props {
  statusFilter?: string;
}

const props = withDefaults(defineProps<Props>(), {
  statusFilter: 'all',
});

// Computed
const reservations = computed(() => {
  const all = ReservationService.getReservations();
  if (!props.statusFilter || props.statusFilter === 'all') {
    return all;
  }
  return all.filter((r) => r.status === props.statusFilter);
});

// Selectors
const tableColumns = [
  { key: 'client', label: 'Cliente' },
  { key: 'date', label: 'Fecha' },
  { key: 'time', label: 'Hora' },
  { key: 'guests', label: 'Personas', align: 'center' as const },
  { key: 'specialRequest', label: 'Solicitud especial' },
  { key: 'status', label: 'Estado', align: 'center' as const },
  { key: 'actions', label: 'Acciones', align: 'right' as const },
];

// Methods
function handleViewReservation(id: number): void {
  console.info('Ver detalle de reserva:', id);
}

function handleConfirmReservation(id: number): void {
  ReservationService.updateReservationStatus(id, 'confirmed');
}

function handleCancelReservation(id: number): void {
  ReservationService.updateReservationStatus(id, 'cancelled');
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-6 space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-base md:text-lg font-bold text-stone-800 tracking-tight">
          Tabla de reservas
        </h2>
        <p class="text-stone-400 text-xs mt-0.5 font-medium">
          Control y detalle de las últimas reservaciones registradas
        </p>
      </div>

      <span
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F4] text-stone-700 border border-stone-200"
      >
        {{ reservations.length }} registros
      </span>
    </div>

    <!-- Base Table with custom cell slots -->
    <BaseTableComponent
      :columns="tableColumns"
      :items="reservations"
      empty-message="No se encontraron reservas con el filtro seleccionado."
    >
      <!-- Client Column Slot -->
      <template #cell(client)="{ item }">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-full bg-[#FAF8F4] border border-stone-200 text-[#1A3D2B] font-bold text-xs flex items-center justify-center shrink-0"
          >
            {{ item.clientName ? String(item.clientName).charAt(0) : 'U' }}
          </div>
          <div>
            <p class="font-semibold text-stone-900 leading-snug">
              {{ item.clientName }}
            </p>
            <p class="text-[11px] text-stone-400">
              {{ item.clientEmail }}
            </p>
          </div>
        </div>
      </template>

      <!-- Guests Column Slot -->
      <template #cell(guests)="{ item }">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700"
        >
          {{ item.guests }} pers.
        </span>
      </template>

      <!-- Special Request Column Slot -->
      <template #cell(specialRequest)="{ item }">
        <span
          class="text-xs text-stone-600 line-clamp-1 max-w-[220px]"
          :title="String(item.specialRequest || 'Sin solicitud')"
        >
          {{ item.specialRequest || '—' }}
        </span>
      </template>

      <!-- Status Column Slot -->
      <template #cell(status)="{ item }">
        <StatusBadgeComponent :status="item.status" />
      </template>

      <!-- Actions Column Slot -->
      <template #cell(actions)="{ item }">
        <div class="flex items-center justify-end gap-1.5">
          <!-- View button -->
          <button
            type="button"
            title="Ver detalles"
            class="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            @click="handleViewReservation(Number(item.id))"
          >
            <Eye class="w-4 h-4" />
          </button>

          <!-- Confirm button (if pending) -->
          <button
            v-if="item.status === 'pending'"
            type="button"
            title="Confirmar reserva"
            class="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
            @click="handleConfirmReservation(Number(item.id))"
          >
            <Check class="w-4 h-4" />
          </button>

          <!-- Cancel button (if pending or confirmed) -->
          <button
            v-if="item.status === 'pending' || item.status === 'confirmed'"
            type="button"
            title="Cancelar reserva"
            class="p-1.5 rounded-lg text-[#C8552A] hover:bg-red-50 transition-colors cursor-pointer"
            @click="handleCancelReservation(Number(item.id))"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </template>
    </BaseTableComponent>
  </div>
</template>
