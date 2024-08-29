<script setup lang="ts">
import type EquipmentFilters from '~/types/EquipmentFilters';

const { equipments, models, states } = useEquipments()

const router = useRouter()
const { query } = useRoute()

const filters = ref<EquipmentFilters>({
  equipment: typeof query.equipment === 'string' ? query.equipment : '',
  model: typeof query.model === 'string' ? query.model : '',
  state: typeof query.state === 'string' ? query.state : ''
})

const tableHeaders = [
  { key: 'name', label: 'Nome' },
  { key: 'modelName', label: 'Modelo' },
  { key: 'stateDateName', label: 'Estado atual', applyColor: true },
  { key: 'position', label: 'Localização atual' }
]

const tableRows = computed(() => {
  if (!equipments.value) return []

  const formattedEquipments = equipments.value?.map(equipment => {
    const recentStateDate = equipment.stateDates.length ?
      equipment.stateDates.reduce((recentStateDate, stateDate) => {
        return recentStateDate.date > stateDate.date ? recentStateDate : stateDate
      }) : null

    const formattedStateDate = recentStateDate?.state?.name ?? 'Sem histórico'

    const recentPosition = equipment.positions.length ?
      equipment.positions.reduce((recentPosition, position) => {
        return recentPosition.date > position.date ? recentPosition : position
      }) : null

    const formattedPosition = recentPosition ? `(${recentPosition.lat}, ${recentPosition.lon})` : 'Sem histórico'

    return {
      key: equipment.id,
      name: equipment.name,
      modelId: equipment.model?.id,
      modelName: equipment.model?.name,
      stateDateId: recentStateDate?.state?.id,
      stateDateName: formattedStateDate,
      position: formattedPosition,
      color: recentStateDate?.state?.color
    }
  }) ?? []

  const filteredEquipments = formattedEquipments.filter(equipment => {
    if (filters.value.equipment && !equipment.name.toLowerCase().includes(filters.value.equipment.toLowerCase())) return false
    else if (filters.value.model && equipment.modelId !== filters.value.model) return false
    else if (filters.value.state && equipment.stateDateId !== filters.value.state) return false

    return true
  })

  return filteredEquipments
})

function onClickRow(equipmentId: string): void {
  router.push(`/equipments/${equipmentId}`)
}
</script>

<template>
  <div id="equipments-container">
    <EquipmentSearchBar
      :filters="filters"
      :models="models"
      :states="states"
    />
    <AppTable
      title="Equipamentos"
      :headers="tableHeaders"
      :rows="tableRows"
      @click="onClickRow"
    />
  </div>
</template>

<style scoped>
#equipments-container {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}
</style>
