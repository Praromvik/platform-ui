<script lang="ts" setup>
useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content:
        'Welcome To My Praromvike. Learn Cloud Knowledge all at one place',
    },
  ],
  titleTemplate: 'প্রারম্ভিক  - %s',
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: 'প্রারম্ভিক ',
  description: 'Dive into cloud development with us and learn  Docker, k8s and many more',
})
</script>

<template>
  <main class="container max-w-6xl mx-auto text-zinc-600">
    <MainHero />
    <MainRecent />
    <MainTrending />
  </main>
</template>
