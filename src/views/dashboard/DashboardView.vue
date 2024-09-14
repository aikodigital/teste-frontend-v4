<script setup lang="ts">
import equipment from '@/helpers/data/equipment.json'
import equipmentModel from '@/helpers/data/equipmentModel.json'
import equipmentStateHistory from '@/helpers/data/equipmentStateHistory.json'
import equipmentState from '@/helpers/data/equipmentState.json'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { type QTableColumn } from 'quasar'
import { exportTable } from '@/helpers/useTableExport'
import { useEquipmentStore } from '@/stores/map'
import BaseBtn from '@/components/BaseBtn.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseCard from '@/components/BaseCard.vue'
import {
  type TableData,
  type Equipments,
  type EquipmentsStatesPositions,
  type EquipmentsPositions,
  type Model,
  type States,
  type HoursCount
} from './index'

enum EquipmentModel {
  HARVESTER = 'Harvester',
  TRACER_CLAW = 'Garra traçadora',
  CARGO_TRUCK = 'Caminhão de carga'
}

const columns: QTableColumn[] = [
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'model', align: 'left', label: 'Modelo do equipamento', field: 'model', sortable: true },
  { name: 'gain', align: 'left', label: 'Ganho do equipamento', field: 'gain', sortable: true },
  {
    name: 'productivity',
    align: 'left',
    label: 'Produtividade do equipamento (%)',
    field: 'productivity',
    sortable: true
  }
]

const equipmentStore = useEquipmentStore()

const tableData = ref<TableData[]>([])
const tableInputFilter = ref<string>('')
const filteredTableData = ref<TableData[]>([])

const equipmentWithMaxProductivity = computed(() => {
  return tableData.value.reduce(
    (max, item) => (parseFloat(item.productivity) > parseFloat(max.productivity) ? item : max),
    tableData.value[0]
  )
})

const equipmentWithMaxGain = computed(() => {
  return tableData.value.reduce(
    (max, item) => (item.gain > max.gain ? item : max),
    tableData.value[0]
  )
})

const imageForCard = (target: string) => {
  let imgUrl: string = ''
  switch (target) {
    case EquipmentModel.HARVESTER:
      imgUrl =
        'https://www.digitalmagazin.de/heftbilder/forsttechnik/forst-technik-2021-02/23632/image-thumb__23632__content/47060730.jpg'
      break
    case EquipmentModel.CARGO_TRUCK:
      imgUrl =
        'https://play-lh.googleusercontent.com/nRFRqGFlExljefeTye68nowJP-cJL5fcLuJSYUqK4XtfBM4fGB32G3L--NkYpWii_g_N=w526-h296-rw'
      break
    case EquipmentModel.TRACER_CLAW:
      imgUrl =
        'https://tmo.com.br/wp-content/uploads/2020/09/GARRA-TRA%C3%87ADORA-FG-80TRR-scaled.jpg'
      break
    default:
      break
  }

  return imgUrl
}

const countHoursByState = (states: EquipmentsStatesPositions[]) => {
  const hoursCount: HoursCount = {}

  states.forEach((state) => {
    const stateId = state.equipmentStateId
    if (!hoursCount[stateId]) {
      hoursCount[stateId] = 0
    }
    hoursCount[stateId]++
  })

  return hoursCount
}

const calculateTotalEarnings = (hoursCount: HoursCount, model: Model) => {
  let totalEarnings = 0

  model.hourlyEarnings.forEach((earning) => {
    const stateHours = hoursCount[earning.equipmentStateId] || 0
    totalEarnings += stateHours * earning.value
  })

  return totalEarnings
}

const calculateProductivity = (
  hoursCount: HoursCount,
  totalHours: number,
  operatingStateId: string
) => {
  const operatingHours = hoursCount[operatingStateId] || 0
  return (operatingHours / totalHours) * 100
}

const calculateEquipmentEarnings = (
  equipments: Equipments[],
  models: Model[],
  equipmentStates: Partial<EquipmentsPositions[]>,
  statesList: States[]
) => {
  const rows: TableData[] = []

  const operatingStateId = statesList.find((state) => state.name === 'Operando')?.id

  equipments.forEach((equipment) => {
    const states = equipmentStates.find(
      (equipmentItemState) => equipmentItemState?.equipmentId === equipment.id
    )
    const model = models.find((modelItem) => modelItem.id === equipment.equipmentModelId)

    if (states && model) {
      const hoursCount = countHoursByState(states.states)
      const totalHours = states.states.length
      const totalEarnings = calculateTotalEarnings(hoursCount, model)
      const productivity = calculateProductivity(hoursCount, totalHours, operatingStateId as string)

      rows.push({
        name: equipment.name,
        model: model.name,
        gain: totalEarnings,
        productivity: productivity.toFixed(2) + '%'
      })
    }
  })

  tableData.value = rows
  filteredTableData.value = tableData.value
}

watch(
  () => equipmentStore.selectedEquipmentModel,
  () => {
    if (!equipmentStore.selectedEquipmentModel) return (filteredTableData.value = tableData.value)

    filteredTableData.value = tableData.value.filter(
      (item) => item.model === equipmentStore.selectedEquipmentModel?.name
    )
  },
  { deep: true }
)

onBeforeMount(() => {
  calculateEquipmentEarnings(
    equipment,
    equipmentModel,
    equipmentStateHistory as EquipmentsPositions[],
    equipmentState
  )
})
</script>
<template>
  <q-page class="">
    <div class="flex row q-pa-md justify-around">
      <BaseCard
        title="Equipamento com maior produtividade"
        :img-url="imageForCard(equipmentWithMaxProductivity.model)"
        :description="`Nome: ${equipmentWithMaxProductivity.name}`"
        :sub-description="`Modelo: ${equipmentWithMaxProductivity.model}`"
        :class="$q.platform.is.mobile ? 'q-mb-md' : ''"
      />
      <BaseCard
        title="Equipamento com maior ganho"
        :img-url="imageForCard(equipmentWithMaxGain.model)"
        :description="`Nome: ${equipmentWithMaxGain.name}`"
        :sub-description="`Modelo: ${equipmentWithMaxGain.model}`"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        title="Informações individuais dos equipamentos"
        :rows="filteredTableData"
        :columns="columns"
        :filter="tableInputFilter"
        row-key="name"
      >
        <template v-slot:top-right>
          <BaseInput
            class="q-mr-md"
            debounce="300"
            v-model="tableInputFilter"
            placeholder="Busque por qualquer termo"
            :class="$q.platform.is.mobile ? 'q-mb-md q-mt-sm' : ''"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </BaseInput>
          <BaseBtn
            icon-right="archive"
            label="Exportar CSV"
            @click="exportTable(columns, tableData)"
          /> </template
      ></q-table>
    </div>
  </q-page>
</template>
<style lang="css" scoped></style>
