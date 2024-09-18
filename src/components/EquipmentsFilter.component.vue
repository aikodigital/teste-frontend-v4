<template>
  <v-text-field
    v-model="textValue"
    class="mx-6"
    clearable
    label="Buscar"
    variant="outlined"
    @update:model-value="filterEquipments"
  />
  <v-chip-group
    v-model="selectedModels"
    color="primary"
    multiple
    class="d-flex mx-6 mt-2"
    @update:model-value="filterEquipments"
  >
    <v-chip
      v-for="model in models"
      :key="model"
      :value="model"
      density="comfortable"
      size="small"
      class="flex-grow-1 justify-center"
    >
      {{ model }}
    </v-chip>
  </v-chip-group>
  <v-chip-group
    v-model="selectedStates"
    color="secondary"
    multiple
    class="d-flex mx-6 mt-2"
    @update:model-value="filterEquipments"
  >
    <v-chip
      v-for="state in states"
      :key="state"
      :value="state"
      color="secondary"
      density="comfortable"
      size="small"
      class="flex-grow-1 justify-center"
    >
      {{ state }}
    </v-chip>
  </v-chip-group>
</template>

<script lang="ts" setup>
import { useEquipment } from '@/stores/equipment.store'
import { computed, ref, type Ref } from 'vue'

const equipmentStore = useEquipment()
const selectedModels: Ref<string[]> = ref([])
const selectedStates: Ref<string[]> = ref([])
const textValue: Ref<string | undefined> = ref()

const models = computed(() => ['Caminhão de carga', 'Harvester', 'Garra traçadora'])
const states = computed(() => ['Parado', 'Manutenção', 'Operando'])

const filterEquipments = () => {
  equipmentStore.filterEquipments(selectedModels.value, selectedStates.value, textValue.value)
}
</script>
