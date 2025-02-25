<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
      <Snackbar />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">

useHead({
  meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }], // no search engine indexing,
  title: 'ForestLog - Aiko'
})
</script>

<style>
.inter {
  font-family: 'Inter', sans-serif;
}

.roboto {
  font-family: 'Roboto', sans-serif
}
</style>
