<template>
  <div
    v-if="storeEquipment.loadingEquipments"
    class="flex flex-col space-y-1.5 justify-center items-center w-full"
  >
    loading
  </div>
  <div class="flex flex-col space-y-1.5 justify-center items-center w-full" v-else>
    <div v-for="equipment in storeEquipment.equipments" :key="equipment.id">
      <EquipmentComponent
        @onClick="showHistoryEquipment"
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
    modal
    header="Visualização do histórico"
    :style="{ width: '45rem' }"
  >
    <Timeline :value="state.states" align="alternate" class="customized-timeline">
      <template #content="slotProps">
        <Card class="mt-4">
          <template #subtitle>
            {{ formatDate(slotProps.item.date) }}
          </template>
          <template #content>
            <div class="flex flex-col items-center justify-center">
              <img
                src="../../assets/img/eq.jpg"
                :alt="slotProps.item.name"
                width="200"
                class="shadow-sm"
              />
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </template>
        </Card>
      </template>
    </Timeline>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEquipmentsStore } from '@/stores/equipments'
import type {
  Equipment,
  States,
  EquipmentState,
  EquipmentModel,
  EquipmentStateHistory,
} from '@/types'
import EquipmentComponent from '@/components/equipment/EquipmentComponent.vue'
import Dialog from 'primevue/dialog'
import Timeline from 'primevue/timeline'
import { formatDate } from '@/utils/format'
import Card from 'primevue/card'
import { getLastKnown } from '@/utils/common'
import { equipmentState } from '@/data/equipmentState'

const storeEquipment = useEquipmentsStore()
const selectedEquipment = ref<Equipment | null>(null)
const visible = ref(false)

const showHistoryEquipment = (id: string): void => {
  const equipment = storeEquipment.equipments.find((equipment) => equipment.id === id)
  selectedEquipment.value = equipment || null
  visible.value = true
}

const state: EquipmentStateHistory = computed(() =>
  storeEquipment.states.find((st) => st.equipmentId === selectedEquipment.value?.id),
)

const equipmentModel: EquipmentModel = (equipmentModelId: string): EquipmentModel | null => {
  return storeEquipment.models.find((model) => model.id === equipmentModelId) || null
}

const equipmentState_ = (id: string): EquipmentState | undefined => {
  const state = storeEquipment.states.find((st) => st.equipmentId === id)

  if (!state) return undefined

  const lastKnownState: States | undefined = getLastKnown(state.states || [])

  return equipmentState.find((st) => st.id === lastKnownState?.equipmentStateId)
}
</script>

<style scoped></style>
