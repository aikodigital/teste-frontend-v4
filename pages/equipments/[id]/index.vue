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
    <div v-if="equipment" class="equipment-info">
      <div class="info-title">{{ equipment.name }}</div>
      <div class="info-actions">
        <div class="back-button" @click="router.back">
          <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
          Voltar
        </div>
      </div>
      <EquipmentCard
        class="info-card"
        :equipmentId="equipment.id"
        :modelName="equipment.model?.name ?? 'Não informado'"
        :recentStateDate="recentStateDate"
        :recentPosition="recentPosition"
        :productivityRate="0.85"
        :profit="8000"
      />
      <AppTable
        title="Histórico de estados"
        :headers="stateHistoryTableHeaders"
        :rows="stateHistoryTableRows"
      />
      <AppTable
        title="Histórico de localizações (lista)"
        :headers="positionHistoryTableHeaders"
        :rows="positionHistoryTableRows"
      />
    </div>
  </div>
</template>

<style scoped>
#equipment-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .equipment-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 4px;
    gap: 32px;
    background-color: white;
    padding: 16px 32px;

    .info-title {
      font-size: 24px;
      font-weight: bold;
    }

    .info-card {
      grid-column: 1/3
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
