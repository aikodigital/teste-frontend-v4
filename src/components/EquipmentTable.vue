<script setup lang="ts">
import { computed } from 'vue'
import { useEquipmentStore } from '@/store/useEquipmentStore'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

const store = useEquipmentStore()

// Computa os dados da tabela, incluindo o último status do equipamento
const equipmentRows = computed(() => {
  return store.filteredData.equipments.map((equip) => {
    // Última posição formatada
    const lastPos = store.getLastPosition(equip.id)
    const lastPositionText = lastPos
      ? `${lastPos.lat.toFixed(4)}, ${lastPos.lon.toFixed(4)}`
      : '–'
    // Última data formatada
    const lastDate = store.getFormattedLastPosition(equip.id)
    // Último status (obtido do histórico de estados)
    const history = store.stateHistory[equip.id] || []
    const lastStateEntry = history.length ? history[history.length - 1] : null
    const lastStatus = lastStateEntry
      ? store.getEquipmentStateName(lastStateEntry.equipmentStateId)
      : '–'
    const lastStatusColor = lastStateEntry
      ? store.getEquipmentStateColor(lastStateEntry.equipmentStateId)
      : '#ccc'
    return {
      id: equip.id,
      name: equip.name,
      model: store.getModelName(equip.equipmentModelId),
      lastPositionText,
      lastDate,
      lastStatus,
      lastStatusColor,
    }
  })
})

// Seleciona o equipamento ao clicar na linha
function handleRowClick(id: string) {
  store.selectEquipment(id)
}
</script>

<template>
  <div class="mt-6">
    <div class="rounded-md border shadow overflow-auto" style="height: 40vh;">
      <Table class="w-full">
        <TableHeader>
          <TableRow>
            <TableHead class="px-4 py-2">Nome</TableHead>
            <TableHead class="px-4 py-2">Modelo</TableHead>
            <TableHead class="px-4 py-2">Última Posição</TableHead>
            <TableHead class="px-4 py-2">Última Data</TableHead>
            <TableHead class="px-4 py-2">Histórico</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in equipmentRows" :key="row.id" @click="handleRowClick(row.id)"
            class="cursor-pointer hover:bg-gray-50 transition"
            :class="{ 'bg-accent': store.selectedEquipmentId === row.id }">
            <TableCell class="px-4 py-2 font-medium">{{ row.name }}</TableCell>
            <TableCell class="px-4 py-2">{{ row.model }}</TableCell>
            <TableCell class="px-4 py-2">{{ row.lastPositionText }}</TableCell>
            <TableCell class="px-4 py-2">{{ row.lastDate }}</TableCell>
            <TableCell class="px-4 py-2">
              <span class="px-2 py-1 rounded text-white text-xs" :style="{ backgroundColor: row.lastStatusColor }">
                {{ row.lastStatus }}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped></style>
