<script setup lang="ts">
import type EquipmentFilters from '~/types/EquipmentFilters';

const { equipments, models, states } = useEquipments()

const { query } = useRoute()
const filters = ref<EquipmentFilters>({
  equipment: typeof query.equipment === 'string' ? query.equipment : '',
  model: typeof query.model === 'string' ? query.model : '',
  state: typeof query.state === 'string' ? query.state : ''
})

const mapMarkers = computed(() => {
  if (!equipments.value) return []

  const equipmentsWithExtraData = equipments.value?.map(equipment => {
    const recentStateDate = equipment.stateDates.length ?
      equipment.stateDates.reduce((recentStateDate, stateDate) => {
        return recentStateDate.date > stateDate.date ? recentStateDate : stateDate
      }) : null

    const recentPosition = equipment.positions.length ?
      equipment.positions.reduce((recentPosition, position) => {
        return recentPosition.date > position.date ? recentPosition : position
      }) : null

    return { ...equipment, recentStateDate, recentPosition }
  }) ?? []

  const filteredEquipments = equipmentsWithExtraData.filter(equipment => {
    if(!equipment.recentPosition) return false
    if (filters.value.equipment && !equipment.name.toLowerCase().includes(filters.value.equipment.toLowerCase())) return false
    else if (filters.value.model && equipment.model?.id !== filters.value.model) return false
    else if (filters.value.state && equipment.recentStateDate?.state?.id !== filters.value.state) return false

    return true
  })

  const formattedEquipments = filteredEquipments.map(equipment => ({
    key: equipment.id,
    name: equipment.name,
    model: equipment.model?.name ?? 'Não informado',
    state: equipment.recentStateDate?.state?.name ?? 'Sem histórico',
    lat: equipment.recentPosition?.lat ?? 0,
    lon: equipment.recentPosition?.lon ?? 0,
    color: equipment.recentStateDate?.state?.color ?? 'inherit'
  })) ?? []


  return formattedEquipments
})

</script>

<template>
  <div class="container">
    <EquipmentSearchBar
      :filters="filters"
      :models="models"
      :states="states"
    />
    <AppMap
      :markers="mapMarkers"
      :markerRadius="8"
      :zoom="9"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  align-items: stretch;
}
</style>
