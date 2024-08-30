<script lang="ts" setup>
import { getEquipmentIcon } from '~/utils/getEquipmentIcon'
import { mockedEquipment } from '~/utils/mockData'
import { getStateColor } from '~/utils/stateUtils'

import { equipmentsKey } from '~/composables/useEquipments'
import type { Equipment, EquipmentsContextProvider, IEquipmentPosition } from '~/types/types'

const { states } = useGetStates()
const map = ref(null)
const activeLines = ref(new Set())
const equipmentColors = ref<Record<string, string>>({})

const { equipments } = inject(equipmentsKey) as EquipmentsContextProvider

const firstEquipment = computed(() => {
  if (!equipments.value.length)
    return mockedEquipment
  return equipments.value[0]
})

function generateCoordinatesArray(equipment: Equipment) {
  return equipment.positionHistory.map((position: IEquipmentPosition) => [position.lat, position.lon])
}

function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

function getEquipmentColor(equipmentId: string): string {
  if (!equipmentColors.value[equipmentId]) {
    equipmentColors.value[equipmentId] = generateRandomColor()
  }
  return equipmentColors.value[equipmentId]
}

function toggleLine(equipmentId: string) {
  if (activeLines.value.has(equipmentId)) {
    activeLines.value.delete(equipmentId)
  }
  else {
    activeLines.value.add(equipmentId)
  }
}

const isLineActive = (equipmentId: string) => activeLines.value.has(equipmentId)

watch(equipments, () => {
  equipments.value.forEach((eq) => {
    getEquipmentColor(eq.id)
  })
})
</script>

<template>
  <LMap
    ref="map"
    :zoom="11"
    :center="[firstEquipment.lastPosition.lat, firstEquipment.lastPosition.lon]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      layer-type="base"
      name="OpenStreetMap"
    />
    <template v-if="equipments.length">
      <template v-for="equipment in equipments" :key="equipment.id">
        <LMarker :lat-lng="[equipment.lastPosition.lat, equipment.lastPosition.lon]">
          <MapIcon :color="getStateColor(equipment.lastState.equipmentStateId)" :icon="getEquipmentIcon(equipment.model)" />
          <LPopup class="flex flex-col items-center gap-2">
            <EquipmentInfos :equipment="equipment">
              <Timeline :states="states" :events="equipment.stateHistory" />
            </EquipmentInfos>
            <Separator />
            <Button variant="ghost" class="flex gap-1" @click="toggleLine(equipment.id)">
              <Icon name="lucide:slash" /> {{ isLineActive(equipment.id) ? 'Desativar' : 'Ativar' }} traçado
            </Button>
          </LPopup>
        </LMarker>

        <LMarker v-if="isLineActive(equipment.id)" :lat-lng="[equipment.positionHistory[0].lat, equipment.positionHistory[0].lon]">
          <MapIcon :color="getStateColor(equipment.stateHistory[0].equipmentStateId)" :icon="getEquipmentIcon(equipment.model)" />
        </LMarker>

        <LPolyline
          v-if="isLineActive(equipment.id)"
          :lat-lngs="generateCoordinatesArray(equipment)"
          :color="equipmentColors[equipment.id]"
        >
          <LPopup class="flex flex-col items-center gap-1">
            <p class="font-semibold">
              {{ equipment.name }}
            </p>
            <Button variant="ghost" class="flex gap-1" @click="toggleLine(equipment.id)">
              <Icon name="lucide:slash" /> {{ isLineActive(equipment.id) ? 'Desativar' : 'Ativar' }} traçado
            </Button>
          </LPopup>
        </LPolyline>
      </template>
    </template>
  </LMap>
</template>

<style>
.leaflet-popup-content-wrapper {
  @apply rounded-md w-auto;
}

.leaflet-popup-content {
  @apply m-0 p-4;
}

.leaflet-popup-content * {
  @apply !m-0;
}
</style>
