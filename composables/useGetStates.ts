import type { IState } from '~/types/types'

export function useGetStates() {
  const services = useServices()
  const states: Ref<IState[]> = ref([])

  function loadStates() {
    try {
      const statesData = services.equipments.fetchStates()
      states.value = statesData
    }
    catch (e) {
      console.error(e)
    }
  }

  onMounted(() => {
    loadStates()
  })

  return { states }
}
