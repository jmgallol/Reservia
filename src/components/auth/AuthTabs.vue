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
  <div class="auth-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="['auth-tabs__btn', { 'auth-tabs__btn--active': activeTab === tab.key }]"
      type="button"
      @click="emit('update:activeTab', tab.key)"
    >
      <component :is="tab.icon" class="auth-tabs__icon" :size="16" />
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.auth-tabs {
  display: inline-flex;
  background: var(--color-bg-tabs);
  border-radius: var(--radius-full);
  padding: 4px;
  gap: 2px;
}

.auth-tabs__btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);
  white-space: nowrap;
  cursor: pointer;
}

.auth-tabs__btn:hover {
  color: var(--color-text-primary);
}

.auth-tabs__btn--active {
  background: var(--color-white);
  color: var(--color-text-primary);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.auth-tabs__icon {
  flex-shrink: 0;
  stroke-width: 2.2;
}
</style>
