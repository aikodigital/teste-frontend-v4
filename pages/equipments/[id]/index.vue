<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type EquipmentPosition from '~/types/EquipmentPosition'
import type EquipmentStateDate from '~/types/EquipmentStateDate'

const router = useRouter()

const route = useRoute()
const equipmentId = route.params.id.toString()

const { getEquipment } = useEquipments()
const equipment = getEquipment(equipmentId)

const sortedStateDates = computed<EquipmentStateDate[]>(() => equipment?.stateDates.sort((stateDateA, stateDateB) => {
  return stateDateB.date.localeCompare(stateDateA.date)
}) ?? [])

const recentStateDate = computed(() => getFirstOrNull(sortedStateDates.value))

const stateHistoryTableHeaders = [
  { key: 'date', label: 'Data' },
  { key: 'state', label: 'Estado', applyColor: true }
]

const stateHistoryTableRows = computed(() => sortedStateDates.value.map(stateDate => ({
  key: stateDate.date,
  date: formatFromRawStringDateToPrettyStringDate(stateDate.date),
  state: stateDate.state?.name ?? 'Não informado',
  color: stateDate.state?.color
})))

const sortedPositions = computed<EquipmentPosition[]>(() => equipment?.positions.sort((positionA, positionB) => {
  return positionB.date.localeCompare(positionA.date)
}) ?? [])

const recentPosition = computed(() => getFirstOrNull(sortedPositions.value))

const positionHistoryTableHeaders = [
  { key: 'date', label: 'Data' },
  { key: 'position', label: 'Localização' }
]

const positionHistoryTableRows = computed(() => sortedPositions.value.map(position => {
  return {
    key: position.date,
    date: formatFromRawStringDateToPrettyStringDate(position.date),
    position: `(${position.lat}, ${position.lon})`
  }
}))
</script>

<template>
  <div id="equipment-container">
    <section class="card-header">
      <div class="card-title">{{ equipment?.name }}</div>
      <div class="card-action" @click="router.back">
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
        Voltar
      </div>
    </section>
    <EquipmentCard
      :equipmentId="equipment?.id"
      :modelName="equipment?.model?.name ?? 'Não informado'"
      :recentStateDate="recentStateDate"
      :recentPosition="recentPosition"
      :productivityRate="0.85"
      :profit="8000"
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
