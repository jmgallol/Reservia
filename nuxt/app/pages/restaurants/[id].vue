<script setup lang="ts">
// Variables
const route = useRoute();
const id = route.params.id;

const { data: restaurant, error } = await useFetch(`/api/restaurants/${id}`);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  });
}

useSeoMeta({
  title: () => `${restaurant.value?.name} · Reservia`,
  description: () => restaurant.value?.description,
});
</script>

<template>
  <article v-if="restaurant">
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/restaurants">← Todos los restaurantes</NuxtLink>
    </p>

    <h1 class="h2">{{ restaurant.name }}</h1>
    <p class="lead mb-2">{{ restaurant.category }} · ★ {{ restaurant.averageRating }}</p>
    <p>{{ restaurant.description }}</p>

    <dl class="row mb-0">
      <dt class="col-sm-3">Ubicación</dt>
      <dd class="col-sm-9">{{ restaurant.address }}, {{ restaurant.city }}</dd>

      <dt class="col-sm-3">Horario</dt>
      <dd class="col-sm-9">{{ restaurant.openingTime }} – {{ restaurant.closingTime }}</dd>
    </dl>
  </article>
</template>
