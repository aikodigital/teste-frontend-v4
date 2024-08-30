<script setup lang="ts">
import type EquipmentListFilters from '~/types/EquipmentListFilters';

const {
  equipments,
  models,
  states,
  getSortedPositionsByDate,
  getSortedStateDatesByDate,
} = useEquipments()

const filters = ref<EquipmentListFilters>({
  equipment: '',
  model: '',
  state: ''
})

const mapMarkers = computed(() => {
  if (!equipments.value || !equipments.value.length) return []

  const filteredEquipments = equipments.value.filter(equipment => {
    const recentPosition = getFirstOrNull(getSortedPositionsByDate(equipment))
    const recentStateDate = getFirstOrNull(getSortedStateDatesByDate(equipment))

    if (!recentPosition) return false
    else if (filters.value.equipment && !equipment.name.toLowerCase().includes(filters.value.equipment.toLowerCase())) return false
    else if (filters.value.model && equipment.model?.id !== filters.value.model) return false
    else if (filters.value.state && recentStateDate?.state?.id !== filters.value.state) return false

    return true
  })

  return filteredEquipments.map(equipment => {
    const recentPosition = getFirstOrNull(getSortedPositionsByDate(equipment))
    const recentStateDate = getFirstOrNull(getSortedStateDatesByDate(equipment))

    return {
      key: equipment.id,
      name: equipment.name,
      model: equipment.model?.name ?? 'Não informado',
      state: recentStateDate?.state?.name ?? 'Sem histórico',
      lat: recentPosition?.lat ?? 0,
      lon: recentPosition?.lon ?? 0,
      date: recentPosition?.date ?? 'Não informado',
      color: recentStateDate?.state?.color ?? 'inherit'
    }
  })
})
</script>

<template>
  <div class="container">
    <EquipmentListSearchBar :filters="filters" :models="models" :states="states" />
    <EquipmentMap :markers="mapMarkers" :zoom="9">
      <template #tooltip="{ marker }">
        <div>
          <div><strong>Nome: </strong>{{ marker.name }}</div>
          <div><strong>Modelo: </strong>{{ marker.model }}</div>
          <div><strong>Estado: <span :style="`color: ${marker.color}`">{{ marker.state }}</span></strong></div>
          <div><strong>Localização: </strong>({{ marker.lat }}, {{ marker.lon }})</div>
        </div>
      </template>
    </EquipmentMap>
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
