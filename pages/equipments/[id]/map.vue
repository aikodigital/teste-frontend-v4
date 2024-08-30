<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type Equipment from '~/types/Equipment';
import type EquipmentDateFilters from '~/types/EquipmentDateFilters';

const router = useRouter()

const route = useRoute()
const equipmentId = route.params.id.toString()

const {
  getEquipment,
  getSortedPositionsByDate,
  getSortedStateDatesByDate
} = useEquipments()

const filters = ref<EquipmentDateFilters>({
  start: '2021-02-01',
  end: '2021-02-28'
})

const formattedFilters = computed<EquipmentDateFilters>(() => ({
  start: formatInputDateToISOString(filters.value.start),
  end: formatInputDateToISOString(filters.value.end)
}))

const equipment = computed<Equipment | null>(() => getEquipment(equipmentId))

const mapMarkers = computed(() => {
  if (!equipment.value || !equipment.value.positions.length) return []

  const recentStateDate = getFirstOrNull(getSortedStateDatesByDate(equipment.value))
  const sortedPositionsByDate = getSortedPositionsByDate(equipment.value)

  const filteredPositions = sortedPositionsByDate.filter(position => {
    const endNextDay = formatToNextDayISOString(formattedFilters.value.end)

    return position.date >= formattedFilters.value.start && position.date < endNextDay
  })

  return filteredPositions.map(position => ({
    key: position.date,
    name: equipment.value?.name ?? 'Não encontrado',
    model: equipment.value?.model?.name ?? 'Não informado',
    state: recentStateDate?.state?.name ?? 'Sem histórico',
    lat: position.lat,
    lon: position.lon,
    date: formatToPrettyStringDate(position.date),
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
    <EquipmentDateSearchBar :filters="filters"/>
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
