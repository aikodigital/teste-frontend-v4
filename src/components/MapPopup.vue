<script setup lang="ts">
import type { EquipmentData } from '@/types/EquipmentTypes'
import { format } from 'date-fns'

const props = defineProps<{
  equipments: EquipmentData
  effect?: boolean
}>()

const date = format(new Date(props.equipments.isLatestPosition.date), "dd/MM/yyyy 'às' HH:mm")
</script>

<template>
  <div class="flex flex-col gap-1 font-sans">
    <h3 class="font-bold text-lg text-root-blue">{{ props.equipments.name }}</h3>
    <div class="m-0 p-0 flex flex-col">
      <p class="m-0 p-0 text-base">
        <span class="font-bold">Tipo:</span> {{ props.equipments.model.name }}
      </p>
      <p v-if="props.equipments.isLatestState && props.effect" class="m-0 p-0 text-base">
        <span class="font-bold">Status: </span>
        <span :style="{ color: props.equipments.isLatestState.color }">{{
          props.equipments.isLatestState.name
        }}</span>
      </p>
      <p class="m-0 p-0 text-base"><span class="font-bold">Atualização:</span> {{ date }}</p>
    </div>
    <span class="text-xs opacity-60 pt-1">
      {{ props.equipments.isLatestPosition.lat }} |
      {{ props.equipments.isLatestPosition.lon }}
    </span>
  </div>
</template>
