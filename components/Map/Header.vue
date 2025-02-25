<template>
  <section class="d-flex align-center justify-space-between mx-2">
    <div class="d-flex flex-column align-start justify-center my-5 pa-3 inter">
      <h1 class="text-h4 font-weight-bold">
        Posições dos equipamentos
      </h1>
      <h2 class="font-weight-regular">O mapa abaixo mostra a última posição de cada equipamento.</h2>
    </div>
    <div>
      <v-select :items="filter" item-value="id" item-title="name" density="comfortable" label="Filtro por estado"
        width="250px" @update:model-value="value => filterEquipments(value)" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { EquipmentsState } from '@dtos/EquipmentState';

interface Props {
  equipmentStates: EquipmentsState[]
}

const { equipmentStates } = defineProps<Props>()

const emit = defineEmits(['filterEquipments'])

const filter = computed(() => {
  return [
    {
      name: 'Todos',
      color: '#090909',
      id: ''
    },
    ...equipmentStates
  ]
})

function filterEquipments(value: string) {
  emit('filterEquipments', value)
}
</script>

<style scoped>
h2 {
  font-size: 16px;
}
</style>
