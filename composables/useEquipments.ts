import type { InjectionKey } from 'vue'
import type { Equipment, EquipmentsContextProvider, IEquipmentModel, UseEquipmentsOptions } from '~/types/types'
import { equipmentAdapter } from '~/services/adapters'

export const equipmentsKey = Symbol('equipments') as InjectionKey<EquipmentsContextProvider>

export function useEquipments() {
  const equipments = ref<Equipment[]>([])
  const filteredEquipments = ref<Equipment[]>([])
  const equipmentModels = ref<IEquipmentModel[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const services = useServices()

  provide(equipmentsKey, { equipments: filteredEquipments, loading })

  async function loadEquipments() {
    loading.value = true
    error.value = null

    try {
      const [
        equipmentsData,
        equipmentModelsData,
        positionHistoriesData,
        stateHistoriesData,
      ] = await Promise.all([
        services.equipments.fetchEquipments(),
        services.equipments.fetchEquipmentModels(),
        services.equipments.fetchEquipmentPositionHistories(),
        services.equipments.fetchEquipmentStateHistories(),
      ])

      equipmentModels.value = equipmentModelsData

      equipments.value = equipmentsData.map((equipment) => {
        const model = equipmentModelsData.find(m => m.id === equipment.equipmentModelId)
        const positionHistory = positionHistoriesData.find(ph => ph.equipmentId === equipment.id)
        const stateHistory = stateHistoriesData.find(sh => sh.equipmentId === equipment.id)

        if (!model || !positionHistory || !stateHistory) {
          throw new Error(`Missing data for equipment ${equipment.id}`)
        }

        return equipmentAdapter(equipment, model, positionHistory, stateHistory)
      })

      filteredEquipments.value = [...equipments.value]
    }
    catch (error) {
      console.error(error)
    }
    finally {
      loading.value = false
    }
  }

  function filterEquipments(options: UseEquipmentsOptions) {
    filteredEquipments.value = equipments.value.filter((equipment) => {
      const stateMatch = !options.state || equipment.lastState.equipmentStateId === options.state
      const nameMatch = !options.equipmentName || equipment.modelId === options.equipmentName
      const idMatch = !options.equipmentId || equipment.id === options.equipmentId
      return stateMatch && nameMatch && idMatch
    })
  }

  onMounted(loadEquipments)

  return { equipments, loading, error, filteredEquipments, equipmentModels, filterEquipments, loadEquipments }
}
