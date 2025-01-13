<template>
  <div
    v-if="loadingStore.loading"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
  >
    <Image :src="Logo" alt="Loading..." class="animate-pulse" width="200" />
    <p class="animate-pulse text-white">Carregando equipamentos...</p>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import Logo from '@/assets/img/aiko.png'

const loadingStore = useLoadingStore()
</script>

<style scoped></style>
