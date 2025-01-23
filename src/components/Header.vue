<script lang="ts" setup>
import logo from '@/assets/img/aiko.png'
</script>

<template>
  <div class="h-12 w-25 mb-8 self-center">
    <img :src="logo" alt="aiko logo" />
  </div>
  <div class="flex flex-col lg:max-w-full items-center">
    <div class="w-full lg:p-6  rounded-lg shadow-lg text-center max-w-125 lg:max-w-full">
      <h2 class="text-2xl font-bold text-cyan-400 mb-4">Explore os Equipamentos</h2>
      <p class="text-gray-300 text-lg mb-6">
        Clique em um marcador abaixo para exibir informações detalhadas de cada equipamento.
      </p>
    </div>
  </div>
</template>
