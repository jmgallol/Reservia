<script setup lang="ts">
useSeoMeta({
  title: 'Inicio · Reservia',
  description: 'Mini versión de Reservia: blog, restaurantes y herramientas para tus reservas.',
});
</script>

<template>
  <section class="p-5 mb-4 bg-primary-subtle border border-primary-subtle rounded-3 shadow-sm text-center">
    <h1 class="display-5 fw-bold text-primary">Reservia</h1>
    <p class="lead text-body-secondary">Mini versión del proyecto, utilizando Nuxt.</p>
    <div class="d-flex flex-wrap justify-content-center gap-2">
      <NuxtLink class="btn text-bg-primary" to="/restaurants">Ver restaurantes</NuxtLink>
      <NuxtLink class="btn btn-outline-dark" to="/blog">Leer el blog</NuxtLink>
    </div>
  </section>
</template>
