<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';

import BaseModalComponent from '@/components/common/BaseModalComponent.vue';

type FeedbackType = 'success' | 'error';

// Variables reactivas
const isOpen = ref(false);
const message = ref('');
const type = ref<FeedbackType>('success');

// Computed
const isError = computed(() => {
  return type.value === 'error';
});

// Métodos
function launch(): void {
  isOpen.value = true;
}

function modifyMessage(newMessage: string, newType: FeedbackType): void {
  message.value = newMessage;
  type.value = newType;
  isOpen.value = true;
}

defineExpose({ launch, modifyMessage });
</script>

<template>
  <BaseModalComponent v-model="isOpen">
    <div class="text-center space-y-4">
      <h2 class="text-lg font-semibold" :class="isError ? 'text-red-600' : 'text-green-600'">
        {{ isError ? 'Error' : 'Éxito' }}
      </h2>

      <p class="text-gray-700">{{ message }}</p>

      <button
        type="button"
        class="px-4 py-2 rounded-lg text-white"
        :class="isError ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
        @click="isOpen = false"
      >
        Aceptar
      </button>
    </div>
  </BaseModalComponent>
</template>
