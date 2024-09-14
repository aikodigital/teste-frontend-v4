import { defineStore } from 'pinia'
import { ref } from 'vue'

interface EquipmentModel {
  id: string
  name: string
}

export const useEquipmentStore = defineStore('equipment', () => {
  const selectedEquipmentModel = ref<EquipmentModel>()
  const searchInput = ref<string>('')
  const useClustersInMap = ref<boolean>(true)

  return {
    selectedEquipmentModel,
    searchInput,
    useClustersInMap
  }
})
