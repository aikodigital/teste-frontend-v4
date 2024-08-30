<script lang="ts" setup>
import type { IEquipmentModelData, IState } from '~/types/types'

const props = defineProps<{
  models: IEquipmentModelData[]
  states: IState[]
}>()

const search = defineModel({
  default: {
    equipmentName: '',
    state: '',
    equipmentId: '',
  },
  required: true,

})

function clearSearch() {
  search.value.equipmentName = ''
  search.value.state = ''
  search.value.equipmentId = ''
}
</script>

<template>
  <div class="flex w-full flex-col items-start gap-2">
    <h2>Filtrar por</h2>
    <div class="flex w-full flex-col gap-2 lg:flex-row">
      <Select v-model="search.equipmentName">
        <SelectTrigger class="w-full text-left lg:w-1/2">
          <SelectValue placeholder="Selecionar modelo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="model in props.models" :key="model.id" :value="model.id">
              {{ model.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select v-model="search.state">
        <SelectTrigger class="w-full lg:w-1/2">
          <SelectValue placeholder="Selecionar status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="state in props.states" :key="state.id" :value="state.id">
              {{ state.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="secondary" @click="clearSearch">
        Limpar
      </Button>
    </div>
  </div>
</template>
