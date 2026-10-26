<script setup lang="ts">
// Imports
import { faqs } from '~/data/faqs';

useSeoMeta({
  title: 'Preguntas frecuentes · Reservia',
  description: 'Respuestas a las dudas más comunes sobre las reservas en Reservia.',
});
</script>

<template>
  <section>
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/tools">← Herramientas</NuxtLink>
    </p>

    <h1 class="h2 mb-3 text-primary">Preguntas frecuentes</h1>

    <details v-for="faq in faqs" :key="faq.question" class="border rounded-3 bg-body p-3 mb-2 shadow-sm">
      <summary class="fw-semibold text-primary">{{ faq.question }}</summary>
      <p class="text-body-secondary mt-2 mb-0">{{ faq.answer }}</p>
    </details>
  </section>
</template>
