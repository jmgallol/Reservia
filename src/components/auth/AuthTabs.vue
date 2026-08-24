<script setup lang="ts">
import type { Component } from 'vue';
import { Lock, UserPlus, Store } from 'lucide-vue-next';

defineProps<{
  activeTab: string;
}>();

const emit = defineEmits<{
  (e: 'update:activeTab', value: string): void;
}>();

interface TabItem {
  key: string;
  label: string;
  icon: Component;
}

const tabs: TabItem[] = [
  { key: 'login', label: 'Ingresar', icon: Lock },
  { key: 'register', label: 'Registro', icon: UserPlus },
  { key: 'admin', label: 'Admin', icon: Store },
];
</script>

<template>
  <div class="inline-flex bg-bg-tabs rounded-full p-1 gap-0.5">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="[
        'flex items-center gap-2 px-5 py-2.5 border-none rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer',
        activeTab === tab.key
          ? 'bg-white text-text-primary font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
          : 'bg-transparent text-text-secondary hover:text-text-primary'
      ]"
      type="button"
      @click="emit('update:activeTab', tab.key)"
    >
      <component :is="tab.icon" class="shrink-0 [stroke-width:2.2]" :size="16" />
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>
