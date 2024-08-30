<template>
  <div class="absolute top-0 left-0 w-full p-5 z-20 bg-slate-300 text-lg">
    <div class="flex flex-row items-center">
      <div class="border border-emerald-800 w-16 h-16 flex items-center justify-center rounded-full text-emerald-800 mr-2">
        <PhosphorIconImageBroken
          weight="thin"
          size="35"
        />
      </div>
      <div>
        <span class="mb-2 block font-light text-emerald-950">{{ data?.name }}</span>

        <button type="button" class="btn" @click="dispatchClickHistory">
          <PhosphorIconClockCounterClockwise class="mr-1" weight="thin" />
          Histórico de Estados
        </button>  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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
    bg-indigo-300
    flex
    flex-row
    items-center
    justify-center
    py-1
    px-3
    text-xs
    rounded-md
    text-indigo-800
}
</style>