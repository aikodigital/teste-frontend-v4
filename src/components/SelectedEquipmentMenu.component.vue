<template>
  <div class="d-flex align-center py-4 top-0 position-sticky selected-equipment-menu__list-item">
    <button
      class="material-symbols-outlined mr-4"
      style="font-size: 40px"
      @click="equipmentStore.selectEquipment()"
    >
      chevron_left
    </button>

    <div class="d-flex flex-column">
      <span class="text-h5 font-weight-bold">
        {{ equipment.name }}
      </span>
      <span>
        {{ equipment.model }}
      </span>
    </div>
  </div>
  <StateCard v-for="(state, index) in equipment.stateHistory" v-bind:key="index" :state="state" />
</template>

<script lang="ts" setup>
import type { IEquipment } from '@/stores/equipment.types'
import StateCard from './StateCard.component.vue'
import { useEquipment } from '@/stores/equipment.store'

const equipmentStore = useEquipment()

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
