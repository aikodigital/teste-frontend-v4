import type { IEquipmentModel } from '~/types/types'

export function useGetModel(modelId: string) {
  const services = useServices()
  const model = ref<IEquipmentModel | null>()

  function loadModels() {
    const models = services.equipments.fetchEquipmentModels()

    model.value = models.find(model => model.id === modelId)
  }

  onMounted(() => {
    loadModels()
  })

  return { model }
}
