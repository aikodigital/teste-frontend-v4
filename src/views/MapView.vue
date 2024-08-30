<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import useEquipmentStore from '@/stores/equipmentStore'
import { storeToRefs } from 'pinia'
import { filterEquipments } from '@/utils/equipment'

import Map from '../components/map/Map.vue'
import MapModal from '../components/map/MapModal.vue'
import MapFilters from '../components/map/MapFilters.vue'
import Skeleton from 'primevue/skeleton'

import type { ComponentExposed } from 'vue-component-type-helpers'

const equipmentStore = useEquipmentStore()
const { isLoading, filteredEquipment, equipmentList, equipmentFilter } = storeToRefs(equipmentStore)

const olMap = ref<ComponentExposed<typeof Map>>()
const mapModal = ref<ComponentExposed<typeof MapModal>>()
const enableClearButton = ref(false)

const handleClickOLMapEquipment = (equipment: Equipment) => {
  mapModal.value?.open(equipment)
}

const handleFilterEquipments = () => {
  const filteredEquipments: Equipment[] = filterEquipments(equipmentList.value, equipmentFilter.value)

  olMap.value?.updateMap(filteredEquipments)
}

const handleVisualizeEquipmentPath = (equipment: Equipment) => {
  olMap.value?.drawPositionHistory(equipment)
  enableClearButton.value = true
}

const handleClearEquipmentPath = () => {
  enableClearButton.value = false
  handleFilterEquipments()
}

onMounted(async () => {
  await equipmentStore.fetchEquipmentData()

  olMap.value?.updateMap(filteredEquipment.value)
})
</script>

<template>
  <div class="grid">
    <div class="col-4">
      <MapFilters
        :enableClearButton="enableClearButton"
        @filterEquipments="handleFilterEquipments"
        @clearEquipmentPath="handleClearEquipmentPath"
      ></MapFilters>
    </div>
    <div class="col-8">
      <template v-if="isLoading">
        <Skeleton height="600px"></Skeleton>
      </template>
      <template v-else>
        <Map
          ref="olMap"
          @clickEquipment="handleClickOLMapEquipment"
        ></Map>
      </template>
    </div>
  </div>
  <MapModal
    ref="mapModal"
    :isLoading="isLoading"
    @visualizeEquipmentPath="handleVisualizeEquipmentPath"
  ></MapModal>
</template>
