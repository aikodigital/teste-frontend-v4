<script setup lang="ts">
import type { VDataTable } from 'vuetify/components';
import type { StateHistory } from '@/stores/equipments/stateHistory';
import type { State } from '@/stores/equipments/state';

const props = defineProps<{
  stateHistory: { current: StateHistory; past: StateHistory[] };
  getState: (id: string) => Omit<State, 'id'>;
}>();

const headers: VDataTable['$props']['headers'] = [
  {
    title: 'Data',
    key: 'date',
    value: (item: StateHistory) => new Date(item.date),
  },
  {
    title: 'Estado',
    key: 'equipmentStateId',
    value: (item: StateHistory) => props.getState(item.equipmentStateId).name,
  },
];
</script>

<template>
  <v-data-table-virtual :headers="headers" :items="stateHistory.past">
    <template v-slot:item="{ item: { date, equipmentStateId } }">
      <tr>
        <td>{{ new Date(date).toLocaleString('pt-BR') }}</td>
        <td>
          <v-chip :color="getState(equipmentStateId).color">
            {{ getState(equipmentStateId).name }}
          </v-chip>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>
