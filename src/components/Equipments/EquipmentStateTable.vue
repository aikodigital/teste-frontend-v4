<script lang="ts" setup>
import type { IEquipmentStateDefinition, IEquipmentStateHistory } from '@/types/equipment.types';
import { normalizeIsoDate, normalizeStateName, getStateColor } from '@/utils/utils';


interface Props {
  statesHistory: IEquipmentStateHistory[];
  states: IEquipmentStateDefinition[];
}

const props = defineProps<Props>()

const headers = [
  { title: 'Data', key: 'date' },
  { title: 'Estado', key: 'equipmentStateId' },
]
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="props.statesHistory[0].states"
    class="text-caption"
    density="compact"
    item-value="date"
    hover
  >
    <template #item="{ item }">
      <tr
        class="text-elips equipment-list__row"
      >
        <td>{{ item.date ? normalizeIsoDate(item.date) : '-' }}</td>
        <td :style="`color: ${getStateColor(item.equipmentStateId, props.states)} !important`">
          {{ normalizeStateName(item.equipmentStateId, props.states) }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
  
</style>
