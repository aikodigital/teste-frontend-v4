<template>
  <v-navigation-drawer permanent flat width="400">
    <div v-if="equipmentStore.selectedEquipment" class="d-flex flex-column ga-4">
      <SelectedEquipmentMenu :equipment="equipmentStore.selectedEquipment" />
    </div>
    <div v-else class="d-flex flex-column ga-4 py-6">
      <v-list-item
        v-for="equipment in equipmentStore.allEquipments"
        v-bind:key="equipment.equipmentId"
      >
        <EquipmentCardComponent :equipment="equipment" @click="onClick(equipment.equipmentId)" />
      </v-list-item>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useEquipment } from '@/stores/equipment.store'
import { onMounted } from 'vue'
import EquipmentCardComponent from './EquipmentCard.component.vue'
import SelectedEquipmentMenu from './SelectedEquipmentMenu.component.vue'

const equipmentStore = useEquipment()

onMounted(() => {
  equipmentStore.getAllEquipments()
})

const onClick = (equipmentId: string) => {
  equipmentStore.selectEquipment(equipmentId)
}
</script>
