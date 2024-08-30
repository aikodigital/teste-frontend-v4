<template>
  <div
    class="absolute top-0 left-0 w-full p-5 z-20 text-lg"
    :class="{
      [ColorEquipmentType.CA]: data?.name === 'Caminhão de carga',
      [ColorEquipmentType.HV]: data?.name === 'Harvester',
      [ColorEquipmentType.GT]: data?.name === 'Garra traçadora'

    }"
  >
    <div class="border-inherit flex flex-row items-center">
      <div class="border border-inherit w-16 h-16 flex items-center justify-center rounded-full mr-2">
        
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
      <div class="border-inherit">
        <span class="mb-2 block font-light text-2xl">{{ data?.name }}</span>

        <button type="button" class="btn" @click="dispatchClickHistory">
          <PhosphorIconClockCounterClockwise class="mr-1" weight="thin" />
          Histórico de Estados
        </button>  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

enum ColorEquipmentType {
  CA = 'bg-red-700 text-slate-100 border-slate-100',
  HV = 'bg-emerald-700 text-slate-100 border-slate-100',
  GT = 'bg-amber-500 text-slate-800 border-slate-800'
}

const props = defineProps<{
  modelId: string
}>()

const emit = defineEmits(['click-history'])
    
const { data } = await useAsyncData(
  'model',
  () => $fetch(`/api/equipment/model/${ props.modelId }`)
)

const dispatchClickHistory = () => {
  emit('click-history')
}

</script>

<style scope>
.btn {
  @apply
    border-inherit
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
    hover:brightness-75
    transition-all
}
</style>