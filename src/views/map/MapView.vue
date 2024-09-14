<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
import EquipmentDetail from './EquipmentDetail.vue'
import equipmentPositionHistory from '@/helpers/data/equipmentPositionHistory.json'
import equipment from '@/helpers/data/equipment.json'
import equipmentModel from '@/helpers/data/equipmentModel.json'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useEquipmentStore } from '@/stores/map'
import { GoogleMap, CustomMarker, MarkerCluster } from 'vue3-google-map'
import { type Equipments, type EquipmentsPositions, type Position } from '@/views/dashboard/index'

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

enum EquipmentModel {
  HARVESTER = 'Harvester',
  TRACER_CLAW = 'Garra traçadora',
  CARGO_TRUCK = 'Caminhão de carga'
}

interface Location {
  id: string
  lat: number
  lng: number
  date: string
  pinName: string
  equipmentModelId: string
}

interface NamedEquipmentsPositions extends EquipmentsPositions {
  name: string
  equipmentModelId: string
}

const equipmentStore = useEquipmentStore()

const filteredEquipments = ref()
const showMarkerDetailsModal = ref<boolean>(false)
const clickedEquipmentId = ref<string>('')
const namedEquipmentsPositions = ref<Partial<NamedEquipmentsPositions>[]>([])
const equipmentsPosition = ref<Location[]>()

const getEquipmentNameById = computed(() => {
  const findedEquipmentById = equipment.find((item) => item.id === clickedEquipmentId.value)
  return findedEquipmentById ? findedEquipmentById.name : ''
})

const createMappedByNameEquipmentPositionsArray = (
  equipmentsList: Equipments[],
  equipmentPositionsList: EquipmentsPositions[]
) => {
  namedEquipmentsPositions.value = []
  namedEquipmentsPositions.value = equipmentPositionsList.map((equipmentPositionItem) => {
    const matchEquipment = equipmentsList.find(
      (equipmentItem) => equipmentItem.id === equipmentPositionItem.equipmentId
    )

    return {
      equipmentId: equipmentPositionItem.equipmentId,
      name: matchEquipment ? matchEquipment.name : 'Equipamento Padrao',
      equipmentModelId: matchEquipment ? matchEquipment.equipmentModelId : '',
      positions: equipmentPositionItem.positions
    }
  })
}

const getLastPosition = (item: EquipmentsPositions) => {
  return item.positions.length > 0 ? item.positions[item.positions.length - 1] : null
}

const createLocationObject = (
  lastPosition: Position,
  name: string,
  id: string,
  equipmentModelId: string
): Location => ({
  id,
  lat: lastPosition.lat,
  lng: lastPosition.lon,
  date: lastPosition.date,
  pinName: name,
  equipmentModelId
})

const createLocationsArray = (equipmentPositionsArray: NamedEquipmentsPositions[]) => {
  equipmentsPosition.value = []
  equipmentsPosition.value = equipmentPositionsArray
    .map((item: NamedEquipmentsPositions) => {
      const lastPosition = getLastPosition(item)
      return lastPosition
        ? createLocationObject(lastPosition, item.name, item.equipmentId, item.equipmentModelId)
        : null
    })
    .filter((location) => location !== null) as Location[]

  filteredEquipments.value = equipmentsPosition.value
}

const handleMarkerClick = (equipmentId: string) => {
  if (equipmentId) {
    clickedEquipmentId.value = equipmentId
    showMarkerDetailsModal.value = true
  }
}

const getIconToEquipmentModel = (equipmentModelId: string) => {
  const matchEquipmentModel = equipmentModel.find((item) => item.id === equipmentModelId)
  let iconName: string = 'location_on'

  switch (matchEquipmentModel?.name) {
    case EquipmentModel.HARVESTER:
      iconName = 'forest'
      break
    case EquipmentModel.CARGO_TRUCK:
      iconName = 'local_shipping'
      break
    case EquipmentModel.TRACER_CLAW:
      iconName = 'back_hand'
      break
    default:
      break
  }

  return iconName
}

const getIconToEquipmentModelName = (equipmentModelId: string) => {
  const matchEquipmentModel = equipmentModel.find((item) => item.id === equipmentModelId)

  return matchEquipmentModel ? matchEquipmentModel.name : ''
}

watch(
  () => equipmentStore.selectedEquipmentModel,
  () => {
    if (!equipmentStore.selectedEquipmentModel)
      return (filteredEquipments.value = equipmentsPosition.value)

    filteredEquipments.value = equipmentsPosition.value?.filter(
      (item) => item.equipmentModelId === equipmentStore.selectedEquipmentModel?.id
    )
  },
  { deep: true }
)

watch(
  () => equipmentStore.searchInput,
  () => {
    filteredEquipments.value = equipmentsPosition.value?.filter(
      (item) => item.pinName.toLowerCase().indexOf(equipmentStore.searchInput.toLowerCase()) > -1
    )
  }
)

onBeforeMount(() => {
  createMappedByNameEquipmentPositionsArray(
    equipment,
    equipmentPositionHistory as NamedEquipmentsPositions[]
  )
  createLocationsArray(namedEquipmentsPositions.value as NamedEquipmentsPositions[])
})
</script>
<template>
  <q-page class="map-content">
    <GoogleMap
      mapId="DEMO_MAP_ID"
      :api-key="MAPS_API_KEY"
      class="map"
      :center="filteredEquipments[0]"
      :zoom="6"
      :min-zoom="4"
    >
      <MarkerCluster v-if="equipmentStore.useClustersInMap">
        <CustomMarker
          v-for="(location, index) in filteredEquipments"
          :key="index"
          :options="{ position: location, anchorPoint: 'BOTTOM_CENTER' }"
          @click="() => handleMarkerClick(location.id)"
        >
          <div style="text-align: center">
            <div style="font-size: 1.125rem">
              {{ location.pinName }} - {{ getIconToEquipmentModelName(location.equipmentModelId) }}
            </div>
            <q-icon
              color="primary"
              :name="getIconToEquipmentModel(location.equipmentModelId)"
              size="45px"
            />
          </div>
        </CustomMarker>
      </MarkerCluster>
      <CustomMarker
        v-else
        v-for="(location, index) in filteredEquipments"
        :key="index"
        :options="{ position: location, anchorPoint: 'BOTTOM_CENTER' }"
        @click="() => handleMarkerClick(location.id)"
      >
        <div style="text-align: center">
          <div style="font-size: 1.125rem">
            {{ location.pinName }} - {{ getIconToEquipmentModelName(location.equipmentModelId) }}
          </div>
          <q-icon
            color="primary"
            :name="getIconToEquipmentModel(location.equipmentModelId)"
            size="45px"
          />
        </div>
      </CustomMarker>
    </GoogleMap>

    <BaseModal
      :model="showMarkerDetailsModal"
      title="Informações adicionais"
      btn-confirm-label="Fechar"
      btn-cancel-label="Cancelar"
      @on-cancel="showMarkerDetailsModal = false"
    >
      <template #content>
        <EquipmentDetail :equipmentId="clickedEquipmentId" :equipmentName="getEquipmentNameById" />
      </template>
    </BaseModal>
  </q-page>
</template>

<style lang="css" scoped>
.map-content {
  height: 100px;
}
.map {
  width: 100%;
  height: 100%;
}
</style>
