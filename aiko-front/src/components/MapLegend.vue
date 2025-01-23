<script lang="ts" setup>
import greenMarker from '../assets/icons/marker-icon-2x-green.png'
import yellowMarker from '../assets/icons/marker-icon-2x-yellow.png'
import redMarker from '../assets/icons/marker-icon-2x-red.png'
</script>

<template>
  <div class="flex py-4 items-center xl:justify-end text-white">
    <h4>Legenda: </h4>
    <div class="flex px-2 items-center">
      <p class="pr-2">Operando</p>
      <img :src="greenMarker" alt="marcador verde" class="h-9 w-6" />
    </div>
    <div class="flex px-1 items-center">
      <p class="pr-2">Manutenção</p>
      <img :src="redMarker" alt="marcador vermelho" class="h-9 w-6" />
    </div>
    <div class="flex px-1 items-center">
      <p class="pr-2">Parado</p>
      <img :src="yellowMarker" alt="marcador amarelo" class="h-9 w-6" />
    </div>
  </div>
</template>
