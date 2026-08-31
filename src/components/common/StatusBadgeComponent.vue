<script setup lang="ts">
// Imports
import { computed } from 'vue';

import type { ReservationStatus } from '@/interfaces/ReservationInterface';
import type { RestaurantStatus } from '@/interfaces/RestaurantInterface';

// Props
type StatusType = ReservationStatus | RestaurantStatus;

interface Props {
  status: StatusType;
}

const props = defineProps<Props>();

// Computed
const statusConfig = computed<{ label: string; classes: string }>(() => {
  const configs: Record<StatusType, { label: string; classes: string }> = {
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
    active: {
      label: 'Activo',
      classes: 'bg-green-100 text-green-700',
    },
    inactive: {
      label: 'Inactivo',
      classes: 'bg-gray-100 text-gray-500',
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
