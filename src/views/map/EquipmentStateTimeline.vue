<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { type EquipmentStateHistory } from '@/views/dashboard/index'

enum States {
  ALL = 'Todos',
  OPERATING = 'Operando',
  MAINTENANCE = 'Manutenção',
  STOPPED = 'Parado'
}

interface EquipmentStateTimeline {
  stateTimeline: EquipmentStateHistory[]
}

const props = defineProps<EquipmentStateTimeline>()

const filteredEquipmentStateTimeline = ref()
const selectedState = ref(States.ALL)
const stateOptions = ref([States.ALL, States.OPERATING, States.MAINTENANCE, States.STOPPED])

watch(
  () => selectedState.value,
  () => {
    if (selectedState.value === States.ALL)
      return (filteredEquipmentStateTimeline.value = props.stateTimeline)

    filteredEquipmentStateTimeline.value = props.stateTimeline.filter(
      (item) => item.state === selectedState.value
    )
  }
)

onBeforeMount(() => {
  filteredEquipmentStateTimeline.value = props.stateTimeline
})
</script>
<template>
  <BaseSelect
    v-model="selectedState"
    :options="stateOptions"
    label="Selecione um estado para filtrar"
    class="q-mt-md"
  />
  <q-timeline layout="dense" side="right" color="secondary">
    <h5>Histórico de estados do equipamento</h5>

    <q-timeline-entry
      v-for="(state, index) in filteredEquipmentStateTimeline"
      :key="index"
      :title="state.state"
      :subtitle="state.date"
      side="left"
    >
    </q-timeline-entry>
  </q-timeline>
</template>
