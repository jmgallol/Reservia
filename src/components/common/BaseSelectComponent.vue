<script setup lang="ts">
// Imports
import { ChevronDown } from 'lucide-vue-next';

// Props
interface Props {
  modelValue: string | number;
  options: {
    label: string;
    value: string | number;
  }[];
  ariaLabel?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Selector',
  id: '',
});

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
}>();

// Methods
function handleChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
  emit('change', target.value);
}
</script>

<template>
  <div class="relative inline-flex items-center">
    <div
      v-if="$slots.icon"
      class="absolute left-3.5 text-stone-400 pointer-events-none flex items-center"
    >
      <slot name="icon" />
    </div>

    <!-- Select input -->
    <select
      :id="props.id"
      :value="props.modelValue"
      :aria-label="props.ariaLabel"
      :class="[
        'py-2 pr-9 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-700 outline-none cursor-pointer appearance-none shadow-xs hover:border-stone-300 focus:border-stone-400 transition-colors',
        $slots.icon ? 'pl-9' : 'pl-4',
      ]"
      @change="handleChange"
    >
      <option v-for="option in props.options" :key="String(option.value)" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <!-- Down Icon -->
    <ChevronDown class="w-3.5 h-3.5 text-stone-400 absolute right-2.5 pointer-events-none" />
  </div>
</template>
