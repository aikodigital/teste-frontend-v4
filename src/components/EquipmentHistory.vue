<script lang="ts" setup>
import { format } from 'date-fns'

interface Props {
  equipmentModel: any
  equipmentType: any
  equipmentStateList: any
}

defineProps<Props>()

const toDate = (date: Date) => format(new Date(date), "dd/MM/yyyy")
const toHour = (date: Date) => format(new Date(date), "HH:mm")

</script>

<template>
  <div
    class="w-2/4 p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-xl border border-gray-700 min-w-125 sm:w-150 md:w-180 lg:w-125 xl:w-150 2xl:w-175">
    <div class="pb-6 text-center">
      <h3 class="text-2xl font-bold text-cyan-400 mb-4 uppercase">Histórico de Estado de equipamento</h3>
      <p class="text-lg text-gray-300 mb-1">
        <span class="font-semibold text-white">Tipo:</span> {{ equipmentModel?.name }}
      </p>
      <p class="text-lg text-gray-300 mb-4">
        <span class="font-semibold text-white">Nome:</span> {{ equipmentType?.name }}
      </p>
    </div>

    <div v-if="equipmentStateList.length" class="w-full">
      <div class="flex items-center justify-between bg-cyan-600 text-black rounded-md px-4 py-2 mb-4 shadow-lg">
        <div class="w-1/3">
          <span class="font-bold uppercase text-sm text-white">Estado</span>
        </div>
        <div class="w-2/3 flex justify-end">
          <span class="font-bold uppercase text-sm pr-4 text-white">Data</span>
          <span class="font-bold uppercase text-sm text-white">Hora</span>
        </div>
      </div>

      <div
        class="flex items-center justify-between py-3 px-4 mb-2 r bg-gray-800 hover:bg-gray-700 transition duration-200 border-b-1 border-b-cyan-800"
        v-for="(item, index) in equipmentStateList" :key="index">
        <div class="flex items-center w-1/3">
          <span class="h-5 w-5 rounded-full mr-3 shadow-lg" :style="{ backgroundColor: item?.states.color }"></span>
          <span class="text-white font-medium text-base pl-2">{{ item?.states.name }}</span>
        </div>
        <div class="w-2/3 flex justify-end">
          <span class="text-cyan-400 font-semibold text-base pr-4">{{ toDate(item.date) }}</span>
          <span class="text-cyan-400 font-semibold text-base">{{ toHour(item.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
