<script setup lang="ts">
// Props
const props = defineProps<{
  modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

// Methods
function close(): void {
  emit('update:modelValue', false);
}
</script>

<template>
  <!-- Overlay -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out [&_.relative]:transition-all [&_.relative]:duration-200 [&_.relative]:ease-out"
      enter-from-class="opacity-0 [&_.relative]:scale-95 [&_.relative]:translate-y-2"
      leave-active-class="transition duration-200 ease-in [&_.relative]:transition-all [&_.relative]:duration-200 [&_.relative]:ease-in"
      leave-to-class="opacity-0 [&_.relative]:scale-95 [&_.relative]:translate-y-2"
    >
      <div v-if="props.modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Dark blurred background -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="close" />

        <!-- White rounded box -->
        <div
          class="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
          role="dialog"
          aria-modal="true"
        >
          <!-- Close button -->
          <button
            type="button"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Cerrar modal"
            @click="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- Content slot -->
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
