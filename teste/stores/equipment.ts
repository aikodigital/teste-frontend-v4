import { defineStore } from 'pinia'

type Equipment = {
  id: string
  equipmentModelId: string
  name: string
}

type HourlyEarnings = {
  equipmentStateId: string
  value: number
}

type EquipmentModel = {
  id: string
  name: string
  hourlyEarnings: HourlyEarnings[]
}

type Positions = {
  date: string
  lat: number
  lon: number
}

type EquipmentPositionHistory = {
  equipmentId: string
  positions: Positions[]
}

type EquipmentState = {
  id: string
  name: string
  color: string
}

type States = {
  date: string
  equipmentStateId: string
}

type EquipmentStateHistory = {
  equipmentId: string
  states: States[]
}

export const useMyEquipmentStore = defineStore({
  id: 'myEquipmentStore',
  state: () => ({
    equipment: [] as Equipment[],
    equipmentModel: [] as EquipmentModel[],
    equipmentPositionHistory: [] as EquipmentPositionHistory[],
    equipmentState: [] as EquipmentState[],
    equipmentStateHistory: [] as EquipmentStateHistory[],
    error: [] as string[],
  }),
  actions: {
    async getAllData() {
      interface TypeMap {
        equipment: Equipment[]
        equipmentModel: EquipmentModel[]
        equipmentPositionHistory: EquipmentPositionHistory[]
        equipmentState: EquipmentState[]
        equipmentStateHistory: EquipmentStateHistory[]
      }

      const endpoints: { url: string, type: keyof TypeMap }[] = [
        { url: 'http://localhost:3000/api/equipment', type: 'equipment' },
        { url: 'http://localhost:3000/api/equipmentModel', type: 'equipmentModel' },
        { url: 'http://localhost:3000/api/equipmentPositionHistory', type: 'equipmentPositionHistory' },
        { url: 'http://localhost:3000/api/equipmentState', type: 'equipmentState' },
        { url: 'http://localhost:3000/api/equipmentStateHistory', type: 'equipmentStateHistory' },
      ]

      await Promise.all(
        endpoints.map(async (endpoint) => {
          const { data, error } = await useFetchData<TypeMap[typeof endpoint.type]>(endpoint.url)

          if (error.value) {
            this.error.push(...error.value)
            return
          }

          if (data.value) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this as any)[endpoint.type] = data.value
          }
        }),
      )
    },
  },
})
