<template>
  <div
    v-if="loadingStore.loading"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
  >
    <img src="../../assets/img/aiko.png" alt="Cargando..." class="w-24 h-24 animate-pulse" />
    <p class="animate-pulse text-white">Carregando equipamentos...</p>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()
</script>

<style scoped></style>
