<template>
  <div
    v-if="!isLoading"
    class="d-flex flex-column pa-4 ga-6 h-screen overflow-y-scroll"
    :style="{ minWidth: 'fit-content' }"
  >
    <v-card
      v-bind:key="index"
      v-for="(equipment, index) in equipmentStore.allEquipments"
      class="mx-auto flex-shrink-0"
      width="350"
      :color="equipment.state.color"
    >
      <v-card-title>
        <span class="text-subtitle-1 font-weight-black text-white">
          {{ equipment.name }}
        </span>
      </v-card-title>
      <v-card-subtitle class="mb-2 mt-n2">
        <span class="font-weight-bold text-white">{{ equipment.model }}</span>
      </v-card-subtitle>
      <v-card-text class="bg-surface-light">
        <div class="d-flex flex-column">
          <span class="font-weight-bold">
            {{ equipment.state.name }}
          </span>
          <div class="d-flex mt-5 ga-6 text-overline font-weight-bold">
            <span>{{ equipment.position.lat }}</span>
            <span>{{ equipment.position.lon }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useEquipment } from '@/stores/equipment.store'
import { onMounted, ref } from 'vue'

const equipmentStore = useEquipment()
let isLoading = ref(true)

onMounted(() => {
  equipmentStore.getAllEquipments()
  isLoading.value = false
})
</script>
