<script setup lang="ts">
// Imports
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Props
interface Props {
  title?: string;
  subtitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  subtitle: undefined,
});

// Variables
const route = useRoute();

// Computed
const headerText = computed(() => {
  if (props.title) {
    return {
      title: props.title,
      subtitle: props.subtitle ?? '',
    };
  }

  switch (route.path) {
    case '/':
    case '/restaurants':
      return {
        title: 'Restaurantes',
        subtitle: 'Encuentra tu próxima experiencia gastronómica',
      };
    case '/map':
      return {
        title: 'Mapa Gastronómico',
        subtitle: 'Explora restaurantes cercanos en tu ciudad',
      };
    case '/my-reservations':
      return {
        title: 'Mis Reservas',
        subtitle: 'Consulta y gestiona tus reservas confirmadas y pendientes',
      };
    case '/my-reviews':
      return {
        title: 'Mis Reseñas',
        subtitle: 'Opiniones y calificaciones que has compartido',
      };
    case '/admin/dashboard':
      return {
        title: 'Dashboard — La Toscana',
        subtitle: 'Estadísticas del restaurante',
      };
    case '/admin/restaurant':
      return {
        title: 'Mi Restaurante',
        subtitle: 'Administración y datos de tu establecimiento',
      };
    case '/admin/reservations':
      return {
        title: 'Reservas del Restaurante',
        subtitle: 'Control y confirmación de reservaciones',
      };
    case '/admin/reviews':
      return {
        title: 'Reseñas de Clientes',
        subtitle: 'Comentarios y valoraciones recibidas',
      };
    default:
      return {
        title: 'Reservia',
        subtitle: 'Plataforma gastronómica',
      };
  }
});
</script>

<template>
  <!-- Unified Top Header for Client and Admin Views -->
  <header class="w-full bg-[#FAF8F4] px-8 py-6 flex items-center justify-between">
    <div>
      <h1
        class="text-2xl md:text-[26px] font-bold text-stone-900 tracking-tight leading-tight font-heading"
      >
        {{ headerText.title }}
      </h1>
      <p v-if="headerText.subtitle" class="text-stone-500 text-xs md:text-sm font-normal mt-1">
        {{ headerText.subtitle }}
      </p>
    </div>

    <!-- Right Side Actions -->
    <div class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </header>
</template>
