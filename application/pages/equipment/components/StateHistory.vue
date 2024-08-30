<template>
  <BottomSheet title="Histórico de Estados" @on-close="emit('close-bottom-sheet')">
    <ul class="-m-2 flex flex-col sm:flex-row flex-wrap">
      <li
        v-for="state in data"
        :key="state.equipmentStateId"
        class="p-2 sm:w-1/2 md:w-1/4 lg:w-1/6"
      >
        <div
          class="border-l-8 p-2 w-full flex flex-row items-center rounded-lg"
          :style="{
            'border-color': getState(state.equipmentStateId).color, 
            'background-color': `${getState(state.equipmentStateId).color}40` 
          }"        
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
            <strong class="text-slate-800 text-sm">{{ getState(state.equipmentStateId).name }}</strong>
            <span class="text-slate-600 text-xs ">{{ dateFormatPtBr(state.date)  }}</span>
          </div>
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