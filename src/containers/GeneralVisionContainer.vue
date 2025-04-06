<script lang="ts" setup>
import { useEquipmentsLoader } from '@/composables/useEquipmentsLoader'
import { useEquipmentSummary } from '@/composables/useEquipmentSummary'
import { useGeneralMap } from '@/composables/useGeneralMap'
import 'leaflet/dist/leaflet.css'

const { createMap, destroyMap, map } = useGeneralMap()
const {
  equipments,
  equipmentStates,
  equipmentsModels,
  equipmentsPositionHistory,
  equipmentsStateHistory,
} = useEquipmentsLoader()

const { mappedEquipmentList } = useEquipmentSummary({
  equipments,
  equipmentsModels,
  equipmentStates,
  equipmentsPositionHistory,
  equipmentsStateHistory,
})

const selectedEquipmentId = ref<null | { id: string, label: string }>(null)
const loading = ref(false)

const equipmentOptions = computed(() =>
mappedEquipmentList.value.map((equip) => ({
    id: equip.equipmentId,
    label: `${equip.equipmentName}`
  }))
)

watch(selectedEquipmentId, (selected) => {
  if (selected) {
    const equipment = mappedEquipmentList.value.find(equip => equip.equipmentId === selected.id)
    if (equipment && equipment.lastPosition?.lat && equipment.lastPosition?.lon) {
      map.value!.setView([equipment.lastPosition.lat, equipment.lastPosition.lon], 14)
    }
  }
})

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    createMap('generalMapContainer', mappedEquipmentList.value)
    if (map.value) {
      map.value.invalidateSize()
      loading.value = false
    }
  }, 1300)
  
})

onUnmounted(() => {
  destroyMap()
})

</script>

<template>
  <BaseCardTitle
    title="Visão geral dos equipamentos"
    icon="mdi-map"
  />
  <v-card class="pb-0 pt-4 px-4 mt-4">
    <v-autocomplete
      v-model="selectedEquipmentId"
      density="comfortable"
      class="text-primary ma-0"
      label="Selecione o equipamento"
      :items="equipmentOptions"
      item-title="label"
      item-value="id"
      return-object
      clearable
      @click:clear="() => map?.setZoom(10)"
    />
  </v-card>
  <v-card
    class="general-map-container mt-4"
  > 
    <BaseLoadingSpinner
      v-if="loading"
      size="48px"
      border-width="6px"
    />
    <div
      v-show="!loading"
      id="generalMapContainer"
      style="height: 100%; width: 100%"
    />
  </v-card>
</template>

<style lang="scss">
  .general-map-container {
    width: 100%;
    height: 700px !important;
    padding: 6px;
  }

  #generalMapContainer {
    width: 100%;
    height: 100%;
  }
</style>