<script setup lang="ts">
import { ref } from 'vue'
import equipments from '../../data/equipment.json'
import equipmentStates from '../../data/equipmentState.json'
import Map from '~/components/Map.vue'
import SelectButton from '~/components/form/SelectButton.vue'
import type { Equipment, EquipmentStatus } from '~/models/Equipment'
import { notify } from '~/utils/notify'

const equipmentFiltered = ref()
const statusFiltered = ref()

function equipmentOptions(equipments: Array<Equipment>) {
  return equipments.map(({ equipmentModelId, ...rest }) => rest)
}

function equipmentStatus(equipmentStates: Array<EquipmentStatus>) {
  return equipmentStates.map(({ color, ...rest }) => rest)
}

function clearFilters() {
  if (!equipmentFiltered.value && !statusFiltered.value) {
    notify('Não há filtros para serem limpos 🤨', 'warning')
    return
  }

  equipmentFiltered.value = undefined
  statusFiltered.value = undefined

  notify('Os filtros foram limpos! 😄', 'success')
}
</script>

<template>
  <div class="grid w-full h-full min-h-[100vh] items-center">
    <div class="flex mx-auto md:my-0 my-14">
      <img
        class="object-scale-down aspect-w-3 aspect-h-2 w-[100px]"
        src="/src/assets/aiko.png"
        alt="Logo Aiko"
      >
    </div>
    <div class="flex flex-col md:flex-row h-[40rem] w-[90%] mx-auto mb:-mt-14 md:mb-0 mb-[25rem] gap-2">
      <div class="flex flex-col items-start justify-start border border-neutral rounded-lg bg-base-200 w-full md:w-1/3">
        <div class="flex w-full h-[100px] border-b border-neutral p-8 justify-between">
          <h1
            class="text-xl font-bold"
          >
            Filtros
          </h1>
          <button
            class="text-sm border-neutral border rounded-lg px-2 bg-neutral hover:bg-base-300 hover:text-base-content transition-all duration-150"
            type="button"
            @click="clearFilters"
          >
            Limpar filtros
          </button>
        </div>
        <div class="flex flex-col w-full items-start justify-start border-b border-neutral col-span-2 p-7 gap-2">
          <SelectButton
            v-model="equipmentFiltered"
            :options="equipmentOptions(equipments)"
            label="Filtrar por equipamento:"
          />
          <SelectButton
            v-model="statusFiltered"
            :options="equipmentStatus(equipmentStates)"
            label="Filtrar por status:"
          />
        </div>
        <div class="flex flex-col items-start w-full border-b border-neutral col-span-2 p-7 gap-2">
          <p
            class="font-bold"
          >
            Legenda:
          </p>
          <div class="flex gap-x-6 items-center self-center">
            <div class="flex flex-col items-center justify-center">
              <img
                src="/src/assets/images/green-marker.png"
                alt="Marcador verde - Operando"
                class="w-[20px]"
              >
              <span
                class="text-sm mt-1"
              >
                Operando
              </span>
            </div>
            <div class="flex flex-col items-center justify-center">
              <img
                src="/src/assets/images/red-marker.png"
                alt="Marcador vermelho - Manutenção"
                class="w-[20px]"
              >
              <span
                class="text-sm mt-1"
              >
                Manutenção
              </span>
            </div>
            <div class="flex flex-col items-center justify-center">
              <img
                src="/src/assets/images/yellow-marker.png"
                alt="Marcador amarelo - Parado"
                class="w-[20px]"
              >
              <span
                class="text-sm mt-1"
              >
                Parado
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full min-h-[30rem] w-full md:w-2/3">
        <Map
          :equipment-filtered="equipmentFiltered"
          :status-filtered="statusFiltered"
          class="rounded-lg"
          @change-selected-equipment="(newEquipmentId: string) => {
            equipmentFiltered = newEquipmentId
          }"
        />
      </div>
    </div>
  </div>
</template>
