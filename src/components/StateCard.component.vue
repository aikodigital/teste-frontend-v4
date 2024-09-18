<template>
  <v-card class="d-flex rounded-0" width="350" elevation="0">
    <v-divider :color="state.color" thickness="4" vertical opacity="1" />
    <div class="d-flex flex-column ml-2">
      <div v-if="state.date" class="d-flex ga-2 align-center text-overline font-weight-bold">
        <span class="material-symbols-outlined" style="font-size: 16px"> calendar_today </span>
        <span>{{ stateDate }}</span>
      </div>
      <span class="font-weight-bold">{{ state.name.toLocaleUpperCase() }}</span>
      <div
        v-if="findPositionByDate"
        class="d-flex align-center mt-5 text-overline font-weight-bold"
      >
        <span class="material-symbols-outlined" style="font-size: 16px"> location_on </span>
        <span class="ml-2 mr-6">{{ findPositionByDate.lat }}</span>
        <span>{{ findPositionByDate.lon }}</span>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useEquipment } from '@/stores/equipment.store'
import type { State } from '@/stores/equipment.types'
import { format } from 'date-fns'
import { computed } from 'vue'

const props = defineProps<{
  state: State
}>()

const equipmentStore = useEquipment()

const stateDate = computed(() => format(props.state.date, 'dd/MM/yyyy'))

const findPositionByDate = computed(() =>
  equipmentStore.selectedEquipment?.positionHistory.find(
    (position) => new Date(position.date).getDate() === props.state.date.getDate()
  )
)
</script>
