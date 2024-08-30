<template>
  <BottomSheet title="Histórico de Estados" @on-close="emit('close-bottom-sheet')">
    <ul class="flex flex-col gap-2">
      <li
        v-for="state in data"
        :key="state.equipmentStateId"
        class="border-l-4 p-2 flex flex-row items-center"
        :style="{ 'border-color': getState(state.equipmentStateId).color }"
      >

        <div class="text-2xl">
          <PhosphorIconProhibit
            v-show="getState(state.equipmentStateId).name === 'Parado'"
            weight="thin"
            :color="getState(state.equipmentStateId).color"
          />
          <PhosphorIconWrench
            v-show="getState(state.equipmentStateId).name === 'Manutenção'"
            weight="thin"
            :color="getState(state.equipmentStateId).color"
          />
          <PhosphorIconSealCheck
            v-show="getState(state.equipmentStateId).name === 'Operando'"
            weight="thin"
            :color="getState(state.equipmentStateId).color"
          />
        </div>
        
        <div class="flex flex-col ml-4">
          <strong>{{ getState(state.equipmentStateId).name }}</strong>
          <span>{{ dateFormatPtBr(state.date)  }}</span>
        </div>
      </li>
    </ul>

  </BottomSheet>
</template>

<script setup lang="ts">
import moment from 'moment'
import getStateSelected from '~/interfaces/admin/equipment/GetStateSelected';

const props = defineProps<{
  equipmentId: string
}>()

const emit = defineEmits(['close-bottom-sheet'])

const { data } = await useFetch(`/api/equipment/${ props.equipmentId }/state-history`)

const getState = (stateId: string) => {
  return getStateSelected(stateId)
}

const dateFormatPtBr = (date: string) => {
  return moment(date).format('DD/MM/YYYY HH:mm')
}

</script>