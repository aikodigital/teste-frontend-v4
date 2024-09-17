<template>
  <v-list-item class="py-4 top-0 position-sticky selected-equipment-menu__list-item">
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
import type { IEquipment } from '@/stores/equipment.types'
import StateCard from './StateCard.component.vue'

defineProps<{
  equipment: IEquipment
}>()
</script>

<style lang="scss" scoped>
.selected-equipment-menu__list-item {
  z-index: 1;
  background-color: v-bind('equipment.state.color');
}
</style>
