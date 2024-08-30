<script lang="ts" setup>
import { ref, watch } from 'vue'
import useEquipmentStore from '@/stores/equipmentStore'
import { storeToRefs } from 'pinia'

import ToggleButton from 'primevue/togglebutton'
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'

const emit = defineEmits(['filterEquipments', 'clearEquipmentPath'])

interface MapFilterProps {
  enableClearButton: boolean
}

const { enableClearButton } = defineProps<MapFilterProps>()

const equipmentStore = useEquipmentStore()
const { isLoading, equipmentModelList, equipmentFilter } = storeToRefs(equipmentStore)

const modelOptions = ref<EquipmentModelFilter[]>()

const createModelOptions = () => {
  const options: EquipmentModelFilter[] = []

  equipmentModelList.value?.forEach((model) => {
    options.push({
      id: model.id,
      name: model.name,
      active: true
    })
  })

  modelOptions.value = options
}

const filterEquipments = async () => {
  equipmentFilter.value.models = modelOptions.value as EquipmentModelFilter[]

  emit('filterEquipments')
}

const clearEquipmentPath = () => {
  emit('clearEquipmentPath')
}

watch(
  equipmentModelList,
  () => {
    createModelOptions()
  },
  { once: true }
)
</script>

<template>
  <div>
    <Card>
      <template #title>Filtrar Equipamentos</template>
      <template #subtitle>Modelo</template>
      <template #content>
        <div class="flex flex-column justify-content-between gap-2">
          <template v-if="isLoading">
            <Skeleton height="4rem"></Skeleton>
            <Skeleton height="4rem"></Skeleton>
            <Skeleton height="4rem"></Skeleton>
          </template>
          <template v-else>
            <ToggleButton
              v-for="(model, index) in modelOptions"
              :key="`model-${index}`"
              class="w-full py-3"
              v-model="model.active"
              @click="filterEquipments"
            >
              {{ model.name }}
            </ToggleButton>
          </template>
        </div>
      </template>
    </Card>
    <Card class="mt-4">
      <template #content>
        <Button
          label="Voltar a visualização de Equipamentos"
          class="w-full"
          :disabled="!enableClearButton"
          @click="clearEquipmentPath"
        ></Button>
      </template>
    </Card>
  </div>
</template>
