<template>
  <div class="flex flex-col space-y-1.5 justify-center items-center w-full">
    <div v-for="equipment in storeEquipment.equipments" :key="equipment.id">
      <EquipmentComponent
        @onClick="
          () => {
            selectedEquipment = equipment
            visible = true
          }
        "
        :selected="selectedEquipment?.id === equipment?.id"
        :id="equipment.id"
        :equipmentName="equipment.name"
        :equipmentModelName="equipmentModel(equipment.equipmentModelId)?.name"
        :equipmentStateName="equipmentState_(equipment.id)?.name"
        :equipmentStateColor="equipmentState_(equipment.id)?.color"
      />
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    maximizable
    modal
    :style="{ width: '45rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <TabComponent :tabs="tabs">
      <template #historico>
        <HistoryDisplay :equipmentId="selectedEquipment?.id" />
      </template>

      <template #produtividade>
        <ProductivityComponent :equipmentId="selectedEquipment?.id" />
      </template>

      <template #ganho>
        <EarningsEquipment :equipmentId="selectedEquipment?.id" />
      </template>
    </TabComponent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEquipmentsStore } from '@/stores/equipments'
import type { Equipment, EquipmentModel, EquipmentState, States } from '@/types'
import EquipmentComponent from '@/components/equipment/EquipmentComponent.vue'
import Dialog from 'primevue/dialog'
import TabComponent from '@/components/tab/TabComponent.vue'
import HistoryDisplay from '@/components/equipment/HistoryDisplay.vue'
import { getLastKnown } from '@/utils/common'
import { equipmentState } from '@/data/equipmentState'
import ProductivityComponent from './ProductivityComponent.vue'
import EarningsEquipment from './EarningsEquipment.vue'

const storeEquipment = useEquipmentsStore()
const selectedEquipment = ref<Equipment | undefined>(undefined)
const visible = ref(false)

const tabs = [
  {
    name: 'Visualização do histórico',
    slot: 'historico',
  },
  {
    name: 'Produtividade do Equipamento',
    slot: 'produtividade',
  },
  {
    name: 'Ganho por Equipamento',
    slot: 'ganho',
  },
]

const equipmentModel = (equipmentModelId: string): EquipmentModel | undefined => {
  return storeEquipment.models.find((model) => model.id === equipmentModelId)
}

const equipmentState_ = (id: string): EquipmentState | undefined => {
  const state = storeEquipment.states.find((st) => st.equipmentId === id)
  if (!state) return undefined

  const lastKnownState: States | undefined = getLastKnown(state.states || [])
  return equipmentState.find((st) => st.id === lastKnownState?.equipmentStateId)
}
</script>

<style scoped></style>
