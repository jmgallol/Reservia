<script setup lang="ts">
// Imports
import { articles } from '~/data/articles';
import { DateFormatUtil } from '~/utils/DateFormatUtil';

useSeoMeta({
  title: 'Blog · Reservia',
  description: 'Artículos sobre cómo sacar provecho de un dashboard de reservas.',
});
</script>

<template>
  <section>
    <h1 class="h2 mb-3">Blog</h1>

    <ul class="list-group">
      <li v-for="article in articles" :key="article.id" class="list-group-item position-relative">
        <NuxtLink class="stretched-link text-decoration-none" :to="`/blog/${article.id}`">
          {{ article.title }}
        </NuxtLink>
        <span class="text-body-secondary d-block small">
          {{ article.author }} · {{ DateFormatUtil.formatLongDate(article.publishedAt) }}
        </span>
      </li>
    </ul>
  </section>
</template>
