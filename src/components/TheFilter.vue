<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import equipmentModel from '@/helpers/data/equipmentModel.json'
import { useEquipmentStore } from '@/stores/map'
import BaseInput from './BaseInput.vue'
import BaseToggle from './BaseToggle.vue'
import BaseSelect from './BaseSelect.vue'

const route = useRoute()
const equipmentStore = useEquipmentStore()

const stateOptions = ref(equipmentModel)

const isMapView = computed(() => {
  return route.name === 'map'
})
</script>

<template>
  <q-banner inline-actions class="bg-grey-100 text-white">
    <div class="flex row justify-start">
      <BaseSelect
        v-model="equipmentStore.selectedEquipmentModel"
        :options="stateOptions"
        label="Modelo do equipamento"
        class="model-select"
        option-label="name"
        option-value="id"
        clearable
      />
      <BaseInput
        v-if="isMapView"
        class="q-ml-md"
        v-model="equipmentStore.searchInput"
        label="Pesquisar"
      ></BaseInput>
      <div class="justify-end flex row" v-if="isMapView">
        <BaseToggle
          v-model="equipmentStore.useClustersInMap"
          class="text-black"
          label="Agrupar em clusters"
        />
      </div>
    </div>
  </q-banner>
</template>

<style lang="css" scoped>
.model-select {
  width: 250px;
}
.search-input {
  width: 250px;
}
</style>
