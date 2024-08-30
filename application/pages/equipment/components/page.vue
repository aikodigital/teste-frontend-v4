<template>
  <NuxtLayout :name="layout">
    <h1>{{ title }}</h1>
    <slot />
  </NuxtLayout>
</template>


<script setup lang="ts">
const layout = 'admin'

const props = defineProps<{
  title: string
}>()

useHead({
  title: `Admin - ${props.title}`
})
</script>