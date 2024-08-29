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
        <ul class="flex flex-row justify-start gap-2">
          <li
            v-for="(earning, index) in data?.hourlyEarnings"
            :key="index"
            class="bg-emerald-800 py-1 px-4 inline-flex text-xs rounded-full text-emerald-200"
          >
            <span>{{ earning.value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelId: string
}>()

    
const { data } = await useAsyncData(
  'model',
  () => $fetch(`/api/equipment/model/${ props.modelId }`)
)

</script>