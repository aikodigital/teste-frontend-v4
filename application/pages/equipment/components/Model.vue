<template>
  <div class="wrap">
    <div class="flex flex-row items-center">
      <div class="border-slate-600 border w-16 h-16 flex items-center justify-center rounded-full mr-2">
        
        <PhosphorIconTruck
          v-if="data?.name === 'Caminhão de carga'"
          weight="thin"
          size="35"
        />

        <PhosphorIconAxe
          v-if="data?.name === 'Harvester'"
          weight="thin"
          size="35"
        />

        <PhosphorIconTractor
          v-if="data?.name === 'Garra traçadora'"
          weight="thin"
          size="35"
        />
      </div>
      <div>
        <span class="mb-2 block font-light text-2xl">{{ data?.name }}</span>
        <div class="flex flex-row gap-1 mb-2">
          <div
            v-for="(earning, index) in data?.hourlyEarnings"
            :key="index"
            class="text-sm inline-flex items-center py-[2px] px-2 rounded-md"
            :style="{ 'background-color': getState(earning.equipmentStateId).color }"
          >
            <PhosphorIconProhibit
              v-show="getState(earning.equipmentStateId).name === 'Parado'"
              weight="thin"
            />
            <PhosphorIconWrench
              v-show="getState(earning.equipmentStateId).name === 'Manutenção'"
              weight="thin"
            />
            <PhosphorIconSealCheck
              v-show="getState(earning.equipmentStateId).name === 'Operando'"
              weight="thin"
            />
            <span class="ml-1">{{ getState(earning.equipmentStateId).name }}</span>
            <span class="text-xs ml-2">{{ formatBRL(earning.value) }}</span>
          </div>
        </div>

        <button type="button" class="btn" @click="dispatchClickHistory">
          <PhosphorIconClockCounterClockwise class="mr-1" weight="thin" />
          Histórico de Estados
        </button>  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getStateSelected from '~/interfaces/admin/equipment/GetStateSelected';

const props = defineProps<{
  modelId: string,
  equipmentId: string
}>()

const emit = defineEmits(['click-history'])
    
const { data } = await useAsyncData(
  'model',
  () => $fetch(`/api/equipment/model/${ props.modelId }`)
)

const dispatchClickHistory = () => {
  emit('click-history')
}

const getState = (stateId: string) => {
  return getStateSelected(stateId)
}

const formatBRL = (value: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(value);  
}

</script>

<style scope>
.wrap {
  @apply
    absolute
    top-0
    left-0
    w-full
    p-5 
    z-20
    text-lg
    bg-gradient-to-r from-slate-200 to-slate-300

}
.btn {
  @apply
    bg-transparent
    flex
    flex-row
    items-center
    justify-center
    py-1
    px-3
    text-xs
    rounded-full
    border
    border-slate-600
    hover:brightness-75
    transition-all
}
</style>