<script setup lang="ts">
// Trae los datos de la capa server directamente
const { data: restaurants } = await useFetch('/api/restaurants');

useSeoMeta({
  title: 'Restaurantes · Reservia',
  description: 'Explora los restaurantes disponibles para reservar en Reservia.',
});
</script>

<template>
  <section>
    <h1 class="h2 mb-3">Restaurantes</h1>

    <ul class="list-group">
      <li
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="list-group-item position-relative"
      >
        <NuxtLink class="stretched-link text-decoration-none" :to="`/restaurants/${restaurant.id}`">
          {{ restaurant.name }}
        </NuxtLink>
        <span class="text-body-secondary d-block small">
          {{ restaurant.category }} · {{ restaurant.city }}
        </span>
      </li>
    </ul>
  </section>
</template>
