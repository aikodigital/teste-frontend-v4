<script setup lang="ts">
import { getEquipmentById } from '@/services/EquipmentService'
import { useMapStore } from '@/store/EquipmentStore'
import type { EquipmentData } from '@/types/EquipmentTypes'
import { format } from 'date-fns'
import { onMounted, ref, watch } from 'vue'

interface HistoryState {
  date: string
  state: string
}

const props = defineProps<{
  equipments: EquipmentData[]
}>()

const mapStore = useMapStore()
const listEquipments = ref<EquipmentData[]>([])
const historyStates = ref<Array<HistoryState>>([])
const equipmentById = ref<EquipmentData>()

onMounted(() => {
  listEquipments.value = props.equipments
})

function setEquipment(equipmentId: string) {
  mapStore.equipmentId = equipmentId
  const equipmentSelected = getEquipmentById(mapStore.equipmentId, props.equipments)

  if (!equipmentSelected) throw new Error('Equipment not found')

  equipmentById.value = equipmentSelected

  for (const history of equipmentSelected.historyState) {
    historyStates.value.push({
      date: format(new Date(history.date), 'dd/MM/yyyy HH:mm'),
      state: equipmentById.value.historyState.find(
        (state) => state.equipmentStateId === history.equipmentStateId
      )?.name as string
    })
  }
}

async function setEquipmentBySearch(textSearch: string) {
  const equipmentsFiltered = props.equipments.filter((equipment) =>
    equipment.name.toLowerCase().includes(textSearch.toLowerCase())
  )

  if (!equipmentsFiltered) return

  listEquipments.value = equipmentsFiltered
}

function reloadPage() {
  window.location.reload()
}

watch(
  () => mapStore.equipmentId,
  () => setEquipment(mapStore.equipmentId)
)

watch(
  () => mapStore.search,
  () => setEquipmentBySearch(mapStore.search)
)
</script>

<template>
  <aside
    class="absolute z-50 top-8 right-12 w-96 max-md:relative max-md:right-0 max-md:container max-md:px-4 max-md:mx-auto"
  >
    <div v-if="!mapStore.equipmentId">
      <div class="relative w-full">
        <span class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <img src="@/assets/search.svg" alt="search" />
        </span>
        <input
          type="text"
          placeholder="Pesquisar"
          class="border px-4 border-root-border rounded-full bg-white transition-all py-4 pl-14 outline-none w-full focus:border-root-blue"
          v-model="mapStore.search"
        />
      </div>
    </div>
    <div class="bg-white rounded-lg py-4 mt-4 border border-root-border">
      <div class="flex justify-center" v-if="listEquipments.length === 0">
        <span class="text-root-text text-center font-medium text-root-blue">
          Ops! Nenhum equipamento encontrado!
        </span>
      </div>
      <div v-if="!mapStore.equipmentId">
        <ul>
          <li
            v-for="equipment in listEquipments"
            :key="equipment.id"
            class="flex border-b items-center justify-between px-4 cursor-pointer hover:bg-gray-100 py-2"
            @click="setEquipment(equipment.id)"
          >
            <div class="flex flex-col">
              <h2 class="text-root-blue font-medium">{{ equipment.name }}</h2>
              <span class="text-sm">{{ equipment.model.name }}</span>
            </div>
            <div class="flex flex-col gap-1 items-end">
              <span class="text-sm">75% de produtividade</span>
              <span class="text-sm">R$ 720,00</span>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="equipmentById" class="px-4 py-2">
        <button
          @click="reloadPage"
          class="px-4 py-1 rounded-lg transition-all text-root-blue mb-4 border border-root-blue hover:bg-root-blue hover:text-white"
        >
          Retornar para todos os equipamentos
        </button>
        <div class="flex flex-col gap-0">
          <h1 class="text-root-blue font-medium text-2xl">{{ equipmentById.name }}</h1>
          <span class="text-lg">{{ equipmentById.model.name }}</span>
          <h3 class="text-lg pt-4 pb-8">
            Status:
            <span :style="`color: ${equipmentById.isLatestState.color}`" class="font-medium">
              {{ equipmentById.isLatestState.name }}</span
            >
          </h3>
        </div>
        <h1 class="pb-4 text-root-blue">Historico:</h1>
        <div class="flex flex-col max-h-96 overflow-y-scroll">
          <ul
            v-for="history in historyStates"
            :key="history.date"
            class="flex justify-between py-2 border-b border-root-border px-4"
          >
            <li>{{ history.state }}</li>
            <li class="text-sm">{{ history.date }}</li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>
