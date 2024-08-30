<script setup lang="ts">
import type EquipmentListFilters from '~/types/EquipmentListFilters';

const router = useRouter()

const {
  equipments,
  models,
  states,
  getSortedPositionsByDate,
  getSortedStateDatesByDate
} = useEquipments()

const filters = ref<EquipmentListFilters>({
  equipment: '',
  model: '',
  state: ''
})

const tableHeaders = [
  { key: 'name', label: 'Nome' },
  { key: 'modelName', label: 'Modelo' },
  { key: 'stateDateName', label: 'Estado atual', applyColor: true },
  { key: 'position', label: 'Localização atual' }
]

const tableRows = computed(() => {
  if (!equipments.value) return []

  const formattedEquipments = equipments.value.map(equipment => {
    const recentPosition = getFirstOrNull(getSortedPositionsByDate(equipment))
    const formattedPosition = recentPosition ? `(${recentPosition.lat}, ${recentPosition.lon})` : 'Sem histórico'

    const recentStateDate = getFirstOrNull(getSortedStateDatesByDate(equipment))
    const formattedStateDate = recentStateDate?.state?.name ?? 'Sem histórico'

    return {
      key: equipment.id,
      name: equipment.name,
      modelId: equipment.model?.id,
      modelName: equipment.model?.name,
      position: formattedPosition,
      stateDateId: recentStateDate?.state?.id,
      stateDateName: formattedStateDate,
      color: recentStateDate?.state?.color
    }
  })

  return formattedEquipments.filter(equipment => {
    if (filters.value.equipment && !equipment.name.toLowerCase().includes(filters.value.equipment.toLowerCase())) return false
    else if (filters.value.model && equipment.modelId !== filters.value.model) return false
    else if (filters.value.state && equipment.stateDateId !== filters.value.state) return false

    return true
  })
})

function onClickRow(equipmentId: string): void {
  router.push(`/equipments/${equipmentId}`)
}
</script>

<template>
  <div id="equipments-container">
    <EquipmentListSearchBar
      :filters="filters"
      :models="models"
      :states="states"
    />
    <AppTable
      title="Equipamentos (clique na linha para ver detalhes)"
      :headers="tableHeaders"
      :rows="tableRows"
      :clickable="true"
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
