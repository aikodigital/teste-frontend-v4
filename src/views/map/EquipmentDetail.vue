<script setup lang="ts">
import equipmentStateHistory from '@/helpers/data/equipmentStateHistory.json'
import equipmentState from '@/helpers/data/equipmentState.json'
import EquipmentStateTimeline from './EquipmentStateTimeline.vue'
import { date } from 'quasar'
import { onBeforeMount, ref } from 'vue'
import {
  type EquipmentsStatesPositions,
  type States,
  type EquipmentStateHistory
} from '@/views/dashboard/index'

interface EquipmentDetail {
  equipmentId: string
  equipmentName: string
}
const props = defineProps<EquipmentDetail>()

const equipmentStatesHistory = ref<EquipmentStateHistory[]>([])
const lastStateOfClickedEquipment = ref<EquipmentsStatesPositions | null>()
const stateOfLastEquipmentState = ref<States>()

const getEquipmentStatesHistory = () => {
  const stateMap = Object.fromEntries(equipmentState.map((state) => [state.id, state.name]))
  const matchEquipmentStateHistory = equipmentStateHistory.find(
    (item) => item.equipmentId === props.equipmentId
  )

  matchEquipmentStateHistory?.states.forEach((state) => {
    const stateName = stateMap[state.equipmentStateId]
    if (stateName) {
      equipmentStatesHistory.value.push({
        state: stateName,
        date: date.formatDate(state.date, 'DD/MM/YYYY HH:mm')
      })
    }
  })
}

const getLastStateOfEquipment = () => {
  const matchEquipment = equipmentStateHistory.find(
    (item) => item.equipmentId === props.equipmentId
  )
  lastStateOfClickedEquipment.value = matchEquipment
    ? matchEquipment.states[matchEquipment.states.length - 1]
    : null
}

const getStateByLastEquipmentState = () => {
  const matchStateByLastEquipmentState = equipmentState.find(
    (item) => item.id === lastStateOfClickedEquipment.value?.equipmentStateId
  )
  matchStateByLastEquipmentState
    ? (stateOfLastEquipmentState.value = matchStateByLastEquipmentState)
    : []
}

onBeforeMount(() => {
  getLastStateOfEquipment()
  getStateByLastEquipmentState()
  getEquipmentStatesHistory()
})
</script>
<template>
  <p>
    Nome do Equipamento: <strong>{{ props.equipmentName }}</strong>
  </p>
  <p>
    Data do ultimo estado:
    <strong>{{ date.formatDate(lastStateOfClickedEquipment?.date, 'DD/MM/YYYY HH:mm') }}</strong>
  </p>
  <div class="row">
    Estado atual:
    <p class="text-bold" :style="{ color: stateOfLastEquipmentState?.color }">
      {{ stateOfLastEquipmentState?.name }}
    </p>
  </div>
  <q-scroll-area class="scroll-timeline-area">
    <EquipmentStateTimeline :stateTimeline="equipmentStatesHistory" />
  </q-scroll-area>
</template>

<style lang="css" scoped>
.scroll-timeline-area {
  height: 400px;
}
</style>
