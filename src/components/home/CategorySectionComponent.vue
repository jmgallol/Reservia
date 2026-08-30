<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { Beef, Fish, Flame, Pizza, Salad, UtensilsCrossed } from 'lucide-vue-next';

// Props
interface Props {
  selectedCategory?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectedCategory: '',
});

// Emits
const emit = defineEmits<{
  selectCategory: [category: string];
}>();

// Variables
const router = useRouter();

// Reactive state
const activeCategory = ref(props.selectedCategory);

// Selectors
const categories = [
  { id: 'italiana', name: 'Italiana', icon: Pizza },
  { id: 'mexicana', name: 'Mexicana', icon: Flame },
  { id: 'japonesa', name: 'Japonesa', icon: Fish },
  { id: 'colombiana', name: 'Colombiana', icon: Beef },
  { id: 'mediterranea', name: 'Mediterránea', icon: Salad },
  { id: 'fusion', name: 'Fusión', icon: UtensilsCrossed },
];

// Methods
function handleSelectCategory(categoryName: string): void {
  activeCategory.value = activeCategory.value === categoryName ? '' : categoryName;
  emit('selectCategory', activeCategory.value);

  // Navigate to restaurants
  if (activeCategory.value) {
    router.push({
      name: 'restaurants',
      query: { category: activeCategory.value },
    });
  }
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-stone-800 tracking-tight">
        Explora por Categorías
      </h2>
      <p class="text-stone-500 text-sm md:text-base mt-2">
        Encuentra el sabor perfecto para cada ocasión gastronómica
      </p>
    </div>

    <!-- Category Chips -->
    <div class="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        :class="[
          'group flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border',
          activeCategory === cat.name
            ? 'bg-[#1A3D2B] text-white border-[#1A3D2B] shadow-md shadow-emerald-950/15 scale-105'
            : 'bg-white text-stone-700 border-stone-200 hover:border-[#1A3D2B]/30 hover:bg-stone-50 hover:text-[#1A3D2B] hover:-translate-y-0.5 shadow-sm',
        ]"
        @click="handleSelectCategory(cat.name)"
      >
        <component
          :is="cat.icon"
          :class="[
            'w-4 h-4 transition-colors',
            activeCategory === cat.name
              ? 'text-[#E8A020]'
              : 'text-[#C8552A] group-hover:text-[#1A3D2B]',
          ]"
        />
        <span>{{ cat.name }}</span>
      </button>
    </div>
  </section>
</template>
