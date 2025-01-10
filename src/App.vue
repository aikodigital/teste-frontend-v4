<script setup lang="ts">
import LoadingComponent from './components/common/LoadingComponent.vue'
</script>

<template>
  <div class="relative">
    <LoadingComponent />
    <RouterView />
  </div>
</template>

<style scoped></style>
