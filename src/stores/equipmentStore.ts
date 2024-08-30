import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/utils/api'
import { createEquipments } from '@/utils/equipment'
import { sleep } from '@/utils/sleep'

const useEquipmentStore = defineStore('equipment', () => {
  const isLoading = ref(false)
  const equipmentList = ref<Equipment[]>([])
  const equipmentModelList = ref<EquipmentModel[]>([])
  const equipmentFilter = ref<EquipmentFilter>({
    models: []
  })
  const filteredEquipment = ref<Equipment[]>([])

  const fetchEquipmentData = async () => {
    isLoading.value = true

    await sleep(1000)

    const equipmentRequest = () => {
      return api.get('/equipment')
    }

    const equipmentPositionHistoryRequest = () => {
      return api.get('/equipmentPositionHistory')
    }

    const equipmentModelRequest = () => {
      return api.get('/equipmentModel')
    }

    const equipmentStateHistoryRequest = () => {
      return api.get('/equipmentStateHistory')
    }

    const equipmentStateRequest = () => {
      return api.get('/equipmentState')
    }

    await Promise.all([
      equipmentRequest(),
      equipmentModelRequest(),
      equipmentPositionHistoryRequest(),
      equipmentStateHistoryRequest(),
      equipmentStateRequest()
    ])
      .then((results) => {
        const equipmentsData: EquipmentData[] = results[0].data
        const equipmentModelData: EquipmentModel[] = results[1].data
        const equipmentPositionHistoryData: EquipmentPositionHistoryData[] = results[2].data
        const equipmentStateHistoryData: EquipmentStateHistoryData[] = results[3].data
        const equipmentStateData: EquipmentStateData[] = results[4].data

        equipmentModelList.value = equipmentModelData

        equipmentList.value = createEquipments(
          equipmentsData,
          equipmentModelData,
          equipmentPositionHistoryData,
          equipmentStateHistoryData,
          equipmentStateData
        )

        filteredEquipment.value = [...equipmentList.value]
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  return { isLoading, equipmentList, filteredEquipment, equipmentModelList, equipmentFilter, fetchEquipmentData }
})

export default useEquipmentStore
