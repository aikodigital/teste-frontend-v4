<script lang="ts" setup>
import { ref, computed } from 'vue'

import { calculateDetails } from '@/utils/equipment'

import Dialog from 'primevue/dialog'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'

import EquipmentDetails from '@/components/equipment/EquipmentDetails.vue'
import EquipmentStateHistory from '@/components/equipment/EquipmentStateHistory.vue'
import EquipmentPositionHistory from '@/components/equipment/EquipmentPositionHistory.vue'

interface MapModalProps {
  isLoading: boolean
}

const emit = defineEmits(['visualizeEquipmentPath'])

const { isLoading } = defineProps<MapModalProps>()

const showModal = ref(false)
const selectedEquipment = ref<Equipment>()

const equipmentDetails = computed(() => {
  return calculateDetails(selectedEquipment.value!)
})

const equipmentStateHistory = computed(() => {
  const stateHistory: EquipmentHistoryState[] = []

  for (let index = 0; index < selectedEquipment.value!.stateHistory.length; index++) {
    const state = selectedEquipment.value?.stateHistory[index]

    stateHistory.push({
      status: state!.name,
      date: new Date(state!.date).toLocaleString(),
      color: state!.color
    })
  }

  return stateHistory
})

const equipmentPositionHistory = computed(() => {
  const positionHistory: EquipmentPosition[] = []

  for (let index = 0; index < selectedEquipment.value!.positionHistory.length; index++) {
    const position = selectedEquipment.value!.positionHistory[index]

    positionHistory.push(position)
  }

  return positionHistory
})

const open = (equipment: Equipment) => {
  selectedEquipment.value = equipment

  showModal.value = true
}

const handleClickVisualizeEquipmentPath = () => {
  showModal.value = false
  emit('visualizeEquipmentPath', selectedEquipment.value)
}

defineExpose({
  open
})
</script>

<template>
  <Dialog
    v-model:visible="showModal"
    modal
    :style="{ maxWidth: '500px', width: '100%' }"
    :draggable="false"
  >
    <template #header>
      <template v-if="isLoading">
        <Skeleton
          width="6rem"
          height="2rem"
        ></Skeleton>
      </template>
      <template v-else>
        <span>{{ `${selectedEquipment?.name} - ${selectedEquipment?.model.name}` }}</span>
        <span
          class="ml-2"
          :style="{ color: selectedEquipment?.stateHistory[0].color }"
        >
          {{ selectedEquipment?.stateHistory[0].name }}
        </span>
      </template>
    </template>

    <template v-if="isLoading">
      <Skeleton height="5rem"></Skeleton>
    </template>
    <template v-else>
      <Tabs value="0">
        <TabList class="flex justify-content-center">
          <Tab value="0">Detalhes</Tab>
          <Tab value="1">Histórico de Estados</Tab>
          <Tab value="2">Histórico de Posições</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <EquipmentDetails
              :gains="equipmentDetails.gains"
              :productivity="equipmentDetails.productivity"
            ></EquipmentDetails>
            <Button
              class="mt-4 w-full"
              icon="pi pi-map-marker"
              label="Visualizar historico de posições no mapa"
              @click="handleClickVisualizeEquipmentPath"
            ></Button>
          </TabPanel>
          <TabPanel value="1">
            <EquipmentStateHistory :equipmentStateHistory="equipmentStateHistory"></EquipmentStateHistory>
          </TabPanel>
          <TabPanel value="2">
            <EquipmentPositionHistory :equipmentPositionHistory="equipmentPositionHistory"></EquipmentPositionHistory>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
  </Dialog>
</template>
