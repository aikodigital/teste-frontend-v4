<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type Equipment from '~/types/Equipment';
import type EquipmentDateFilters from '~/types/EquipmentDateFilters';
import type EquipmentPosition from '~/types/EquipmentPosition'
import type EquipmentStateDate from '~/types/EquipmentStateDate'

const router = useRouter()

const route = useRoute()
const equipmentId = route.params.id.toString()

const {
  getEquipment,
  getSortedPositionsByDate,
  getSortedStateDatesByDate,
  calculateTotalEarningsByPeriod,
  calculateProductivityByPeriod
} = useEquipments()

const filters = ref<EquipmentDateFilters>({ start: '2021-02-01', end: '2021-02-28' })

const formattedFilters = computed<EquipmentDateFilters>(() => ({
  start: formatInputDateToISOString(filters.value.start),
  end: formatInputDateToISOString(filters.value.end)
}))

const equipment = computed<Equipment | null>(() => getEquipment(equipmentId))

const sortedPositionsByDate = computed<EquipmentPosition[]>(() => getSortedPositionsByDate(equipment.value))
const recentPosition = computed<EquipmentPosition | null>(() => getFirstOrNull(sortedPositionsByDate.value))

const sortedStateDatesByDate = computed<EquipmentStateDate[]>(() => getSortedStateDatesByDate(equipment.value))
const recentStateDate = computed<EquipmentStateDate | null>(() => getFirstOrNull(sortedStateDatesByDate.value))

const stateHistoryTableHeaders = [
  { key: 'date', label: 'Data' },
  { key: 'state', label: 'Estado', applyColor: true }
]

const positionHistoryTableHeaders = [
  { key: 'date', label: 'Data' },
  { key: 'position', label: 'Localização' }
]

const stateHistoryTableRows = computed(() => {
  const filteredStateDates = sortedStateDatesByDate.value.filter(stateDate => {
    const endNextDay = formatToNextDayISOString(formattedFilters.value.end)

    return stateDate.date >= formattedFilters.value.start && stateDate.date < endNextDay
  })

  return filteredStateDates.map(stateDate => ({
    key: stateDate.date,
    date: formatToPrettyStringDate(stateDate.date),
    state: stateDate.state?.name ?? 'Não informado',
    color: stateDate.state?.color
  }))
})

const positionHistoryTableRows = computed(() => {
  const filteredPositions = sortedPositionsByDate.value.filter(position => {
    const endNextDay = formatToNextDayISOString(formattedFilters.value.end)

    return position.date > formattedFilters.value.start && position.date < endNextDay
  })

  return filteredPositions.map(position => ({
    key: position.date,
    date: formatToPrettyStringDate(position.date),
    position: `(${position.lat}, ${position.lon})`
  }))
})

const totalEarningsByPeriod = computed(() => {
  return calculateTotalEarningsByPeriod(equipment.value, formattedFilters.value.start, formattedFilters.value.end)
})

const productivityByPeriod = computed(() => {
  return calculateProductivityByPeriod(equipment.value, formattedFilters.value.start, formattedFilters.value.end)
})
</script>

<template>
  <div id="equipment-container">
    <section class="card-header">
      <div class="card-title">{{ equipment?.name ?? 'Não encontrado' }}</div>
      <div class="card-action" @click="router.back">
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
        Voltar
      </div>
    </section>
    <EquipmentDateSearchBar :filters="filters"/>
    <EquipmentCard
      :equipmentId="equipment?.id"
      :modelName="equipment?.model?.name ?? 'Não informado'"
      :recentStateDate="recentStateDate"
      :recentPosition="recentPosition"
      :productivityRate="productivityByPeriod"
      :earning="totalEarningsByPeriod"
    />
    <section class="card-tables">
      <AppTable
        class="card-table"
        title="Histórico de estados"
        :headers="stateHistoryTableHeaders"
        :rows="stateHistoryTableRows"
      />
      <AppTable
        class="card-table"
        title="Histórico de localizações (lista)"
        :headers="positionHistoryTableHeaders"
        :rows="positionHistoryTableRows"
      />
    </section>
  </div>
</template>

<style scoped>
#equipment-container {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  gap: 16px;
  background-color: white;
  padding: 16px 32px;

  .card-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;
    font-weight: bold;

    .card-title {
      font-size: 24px;
    }

    .card-action {
      color: var(--primary-color);

      &:hover {
        color: var(--secondary-color);
      }
    }
  }

  .card-tables {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;

    .card-table {
      flex: 1;
    }
  }
}
</style>
