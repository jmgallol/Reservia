<script setup lang="ts">
// External imports
import { computed } from 'vue';

// Internal imports
import type { ReservationStatus } from '@/interfaces/ReservationInterface';

const props = defineProps<{
  status: ReservationStatus;
}>();

// Computed
const statusConfig = computed<{ label: string; classes: string }>(() => {
  const configs: Record<ReservationStatus, { label: string; classes: string }> = {
    pending: {
      label: 'Pendiente',
      classes: 'bg-amber-100 text-amber-600',
    },
    confirmed: {
      label: 'Confirmada',
      classes: 'bg-green-100 text-green-700',
    },
    completed: {
      label: 'Completada',
      classes: 'bg-gray-100 text-gray-500',
    },
    cancelled: {
      label: 'Cancelada',
      classes: 'bg-red-100 text-red-500',
    },
  };

  return configs[props.status];
});
</script>

<template>
  <!-- Status chip -->
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
      statusConfig.classes,
    ]"
  >
    {{ statusConfig.label }}
  </span>
</template>
