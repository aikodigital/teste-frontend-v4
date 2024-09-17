<template>
  <v-list-item
    class="py-4"
    :style="{
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: equipment.state.color
    }"
  >
    <template #title>
      <span class="text-h5 font-weight-bold">
        {{ equipment.name }}
      </span>
    </template>
    <template #subtitle>
      {{ equipment.model }}
    </template>
  </v-list-item>
  <StateCard v-for="(state, index) in equipment.stateHistory" v-bind:key="index" :state="state" />
</template>

<script lang="ts" setup>
import type { IEquipment } from '@/stores/equipment.store'
import StateCard from './StateCard.component.vue'

defineProps<{
  equipment: IEquipment
}>()
</script>
