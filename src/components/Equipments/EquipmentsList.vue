<script lang="ts" setup>
import { type IEquipment, type IEquipmentModel, type IEquipmentStateDefinition , type IEquipmentStateHistory } from '@/types'
import { normalizeModelName } from '@/utils/utils';

interface Props {
  equipments: IEquipment[];
  equipmentsModels: IEquipmentModel[];
  equipmentStateHistory: IEquipmentStateHistory[];
  equipmentStates: IEquipmentStateDefinition [];
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'equipmentClick', item: IEquipment): void
}>()

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'Modelo', key: 'equipmentModelId' },
  { title: 'Ver detalhes', key: 'actions', sorting: false },
]

</script>

<template>
  <v-container class="equipment-list-container">
    <v-data-table
      :headers="headers"
      :items="props.equipments"
      class="text-caption"
      density="compact"
      item-value="name"
      hover
    >
      <template #item="{ item }">
        <tr
          class="text-elips equipment-list__row"
          @click="() => emit('equipmentClick', item)"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ normalizeModelName(item.equipmentModelId, equipmentsModels) }}</td>
          <td class="text-end">
            <v-icon
              class="ml-4 d-flex"
              size="large"
            >
              mdi-book-open-blank-variant-outline
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<style lang="scss">
.equipment-list-container {
  & .equipment-list__row {
    cursor: pointer
  }
}
</style>
