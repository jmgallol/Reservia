<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { Star } from 'lucide-vue-next';

// Props
interface Props {
  rating: number;
  readonly?: boolean;
  maxStars?: number;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
  maxStars: 5,
  size: 20,
});

// Emits
const emit = defineEmits<{
  change: [rating: number];
  'update:rating': [rating: number];
}>();

// Variables reactivas
const hoverRating = ref(0);

// Métodos
function isStarFilled(starIndex: number): boolean {
  const currentRating = hoverRating.value > 0 ? hoverRating.value : props.rating;
  return starIndex <= Math.round(currentRating);
}

function handleMouseEnter(starIndex: number): void {
  if (!props.readonly) {
    hoverRating.value = starIndex;
  }
}

function handleMouseLeave(): void {
  if (!props.readonly) {
    hoverRating.value = 0;
  }
}

function handleSelect(starIndex: number): void {
  if (!props.readonly) {
    emit('change', starIndex);
    emit('update:rating', starIndex);
  }
}
</script>

<template>
  <!-- Contenedor de Estrellas -->
  <div
    class="inline-flex items-center gap-1 select-none"
    :class="{ 'cursor-pointer': !readonly }"
    @mouseleave="handleMouseLeave"
  >
    <button
      v-for="star in maxStars"
      :key="star"
      type="button"
      :disabled="readonly"
      :aria-label="`Calificar con ${star} de ${maxStars} estrellas`"
      :class="[
        'p-0.5 transition-transform duration-150 focus:outline-none',
        !readonly ? 'hover:scale-110 cursor-pointer' : 'cursor-default',
      ]"
      @mouseenter="handleMouseEnter(star)"
      @click="handleSelect(star)"
    >
      <Star
        :size="size"
        :class="[
          'transition-colors duration-150',
          isStarFilled(star)
            ? 'text-amber-400 fill-amber-400'
            : 'text-gray-300 fill-transparent',
        ]"
      />
    </button>
  </div>
</template>
