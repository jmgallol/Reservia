<script setup lang="ts">
// Imports
import { CalendarCheck, ShieldCheck, Sparkles } from 'lucide-vue-next';

// Selectors
const benefits = [
  {
    id: 'instant-booking',
    title: 'Reserva Instantánea',
    description:
      'Garantiza tu mesa en segundos con confirmación inmediata, sin llamadas ni demoras.',
    icon: CalendarCheck,
  },
  {
    id: 'verified-reviews',
    title: 'Opiniones 100% Reales',
    description:
      'Descubre valoraciones y comentarios verificados de comensales reales para elegir con confianza.',
    icon: ShieldCheck,
  },
  {
    id: 'exclusive-perks',
    title: 'Experiencias Exclusivas',
    description:
      'Accede a menús especiales, eventos gastronómicos y atención preferencial en los mejores locales.',
    icon: Sparkles,
  },
];
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-16">
    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-12">
      <span class="text-xs uppercase tracking-widest text-[#C8552A] font-bold">
        ¿Por qué elegirnos?
      </span>
      <h2 class="text-2xl md:text-3xl font-bold text-stone-800 tracking-tight mt-2">
        La mejor experiencia gastronómica desde la reserva
      </h2>
    </div>

    <!-- 3 Benefit Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="benefit in benefits"
        :key="benefit.id"
        class="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start hover:-translate-y-1"
      >
        <div
          class="w-12 h-12 rounded-2xl bg-[#FAF8F4] border border-[#1A3D2B]/10 flex items-center justify-center text-[#1A3D2B] mb-6 shadow-inner"
        >
          <component :is="benefit.icon" class="w-6 h-6 text-[#C8552A]" />
        </div>
        <h3 class="text-lg font-bold text-stone-800 mb-2">
          {{ benefit.title }}
        </h3>
        <p class="text-stone-500 text-sm leading-relaxed">
          {{ benefit.description }}
        </p>
      </div>
    </div>
  </section>
</template>
