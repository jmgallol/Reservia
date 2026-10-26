<script setup lang="ts">
// Variables
const tools = [
  {
    title: 'Calculadora de cuenta',
    to: '/tools/bill-calculator',
    description: 'Calcula la propina y cuánto paga cada persona.',
  },
  {
    title: 'Preguntas frecuentes',
    to: '/tools/faqs',
    description: 'Resuelve las dudas más comunes sobre las reservas.',
  },
];

useSeoMeta({
  title: 'Herramientas · Reservia',
  description: 'Calculadora de cuenta y preguntas frecuentes de Reservia.',
});
</script>

<template>
  <section>
    <h1 class="h2 mb-3 text-primary">Herramientas</h1>

    <ul class="list-group shadow-sm">
      <li
        v-for="tool in tools"
        :key="tool.to"
        class="list-group-item list-group-item-action position-relative py-3"
      >
        <NuxtLink class="stretched-link text-decoration-none fw-semibold" :to="tool.to">
          {{ tool.title }}
        </NuxtLink>
        <span class="text-body-secondary d-block small">{{ tool.description }}</span>
      </li>
    </ul>
  </section>
</template>
