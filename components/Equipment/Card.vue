<script setup lang="ts">
import type EquipmentPosition from '~/types/EquipmentPosition';
import type EquipmentStateDate from '~/types/EquipmentStateDate';

interface CardProps {
  modelName: string
  recentStateDate: EquipmentStateDate | null
  recentPosition: EquipmentPosition | null
  productivityRate: number
  profit: number
}

const props = defineProps<CardProps>()

const formattedStateDate = computed<string>(() => {
  if (!props.recentStateDate?.state) return 'Sem histórico'

  return props.recentStateDate.state.name
})

const stateDateColorStyle = computed<string>(() => {
  if (!props.recentStateDate?.state) return ''

  return `color: ${props.recentStateDate.state.color}`
})

const formattedPosition = computed<string>(() => {
  if (!props.recentPosition) return 'Sem histórico'

  return `(${props.recentPosition.lat}, ${props.recentPosition.lon})`
})
</script>

<template>
  <div id="card-container">
    <div>
      <strong>Modelo: </strong>
      {{ props.modelName }}
    </div>
    <div>
      <strong>Estado Atual: </strong>
      <strong :style="stateDateColorStyle">
        {{ formattedStateDate }}
      </strong>
    </div>
    <div>
      <strong>Percentual de produtividade: </strong>
      {{ formatFromNumberToStringPercentage(props.productivityRate) }}
    </div>
    <div>
      <strong>Localização Atual: </strong>
      {{ formattedPosition }}
    </div>
    <div>
      <strong>Ganho: </strong>
      {{ props.profit }}
    </div>
    <div>
      <strong>Histórico de localizações: </strong>
      <NuxtLink to="/equipments">Ver mapa</NuxtLink>
    </div>
  </div>
</template>


<style scoped>
#card-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgb(250, 250, 250);
  row-gap: 16px;
  padding: 16px;
  font-size: 14px;
  
  a {
    font-weight: bold;
    color: var(--primary-color);

    &:hover {
      color: var(--secondary-color);
    }
  }
}
</style>
