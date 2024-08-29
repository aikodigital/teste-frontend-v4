<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter()

const route = useRoute()
const equipmentId = route.params.id.toString()

const { getEquipment } = useEquipments()
const equipment = getEquipment(equipmentId)

const mapMarkers = computed(() => {
  if (!equipment || !equipment.positions.length) return []

  const recentStateDate = equipment.stateDates.length ?
    equipment.stateDates.reduce((recentStateDate, stateDate) => {
      return recentStateDate.date > stateDate.date ? recentStateDate : stateDate
    }) : null

  const sortedEquipmentPositions = equipment.positions.sort((positionA, positionB) => {
    return positionA.date.localeCompare(positionB.date)
  })

  return sortedEquipmentPositions.map(position => ({
    key: equipment.id,
    name: equipment.name,
    model: equipment.model?.name ?? 'Não informado',
    state: recentStateDate?.state?.name ?? 'Sem histórico',
    lat: position.lat,
    lon: position.lon,
    date: formatFromRawStringDateToPrettyStringDate(position.date),
    color: recentStateDate?.state?.color ?? 'inherit'
  }))
})
</script>

<template>
  <div id="equipment-map-container">
    <div class="map-info">
      <div class="info-title">{{ equipment?.name }} ({{ equipment?.model?.name }})</div>
      <div class="info-actions">
        <div class="back-button" @click="router.back">
          <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
          Voltar
        </div>
      </div>
    </div>
    <EquipmentMap :markers="mapMarkers" :zoom="11" :hasPath="true">
      <template #tooltip="{ marker }">
        <div>
          <div><strong>Localização: </strong>({{ marker.lat }}, {{ marker.lon }})</div>
          <div><strong>Data: </strong>{{ marker.date }}</div>
        </div>
      </template>
    </EquipmentMap>
  </div>
</template>

<style scoped>
#equipment-map-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  align-items: stretch;

  .map-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: var(--container-color);
    border-radius: 4px;
    row-gap: 16px;
    padding: 16px 32px;

    .info-title {
      font-size: 24px;
      font-weight: bold;
    }

    .info-actions {
      align-self: center;
      justify-self: end;

      .back-button {
        font-weight: bold;
        color: var(--primary-color);

        &:hover {
          color: var(--secondary-color);
        }
      }
    }
  }
}
</style>
