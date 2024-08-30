<script setup lang="ts">
import type EquipmentPosition from '~/types/EquipmentPosition';
import type EquipmentStateDate from '~/types/EquipmentStateDate';

interface CardProps {
  equipmentId?: string
  modelName: string
  recentStateDate: EquipmentStateDate | null
  recentPosition: EquipmentPosition | null
  productivityRate: number
  earning: number
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
    <section>
      <div>
        <strong>Modelo: </strong>
        {{ props.modelName }}
      </div>
      <div>
        <strong>Estado: </strong>
        <strong :style="stateDateColorStyle">
          {{ formattedStateDate }}
        </strong>
      </div>
    </section>
    <section>
      <div>
        <strong>Ganho (no período): </strong>
        {{ props.earning }}
      </div>
      <div>
        <strong>Produtividade (no período): </strong>
        {{ formatNumberToStringPercentage(props.productivityRate) }}
      </div>
    </section>
    <section>
      <div>
        <strong>Localização: </strong>
        {{ formattedPosition }}
      </div>
      <div v-if="equipmentId">
        <strong>Histórico de localizações: </strong>
        <NuxtLink :to="`/equipments/${equipmentId}/map`">Ver mapa</NuxtLink>
      </div>
    </section>
  </div>    
</template>


<style scoped>
#card-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: var(--container-color);
  gap: 16px;
  padding: 16px;
  font-size: 14px;
  
  section {
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    a {
      font-weight: bold;
      color: var(--primary-color);

      &:hover {
        color: var(--secondary-color);
      }
    }
  }
}
</style>
