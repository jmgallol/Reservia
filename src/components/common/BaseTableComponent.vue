<script setup lang="ts" generic="T extends object">
// Props
interface Props {
  columns: {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
  }[];
  items: T[];
  emptyMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  emptyMessage: 'No hay datos disponibles para mostrar.',
});

// Methods
function getCellValue(item: T, key: string): unknown {
  return (item as Record<string, unknown>)[key];
}
</script>

<template>
  <div class="w-full overflow-x-auto bg-white rounded-2xl border border-stone-200/80 shadow-xs">
    <table class="w-full text-left text-sm border-collapse">
      <!-- Table Header -->
      <thead
        class="bg-stone-50/80 text-stone-500 text-xs font-semibold uppercase tracking-wider border-b border-stone-200/80"
      >
        <tr>
          <th
            v-for="col in props.columns"
            :key="col.key"
            :class="[
              'py-3.5 px-5',
              col.align === 'center'
                ? 'text-center'
                : col.align === 'right'
                  ? 'text-right'
                  : 'text-left',
            ]"
            :style="col.width ? { width: col.width } : undefined"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="divide-y divide-stone-100 text-stone-700">
        <tr
          v-for="(item, index) in props.items"
          :key="index"
          class="hover:bg-stone-50/60 transition-colors"
        >
          <td
            v-for="col in props.columns"
            :key="col.key"
            :class="[
              'py-3.5 px-5',
              col.align === 'center'
                ? 'text-center'
                : col.align === 'right'
                  ? 'text-right'
                  : 'text-left',
            ]"
          >
            <!-- Scoped Slot for custom column rendering -->
            <slot :name="`cell(${col.key})`" :item="item" :value="getCellValue(item, col.key)">
              {{ getCellValue(item, col.key) }}
            </slot>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="props.items.length === 0">
          <td
            :colspan="props.columns.length"
            class="py-10 px-5 text-center text-stone-400 text-sm italic"
          >
            {{ props.emptyMessage }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
