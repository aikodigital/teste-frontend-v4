import { defineStore } from 'pinia'
import type { Equipment } from '~/models/Equipment'

interface State {
  equipments: Equipment[]
}

const useEquipmentsStore = defineStore('Equipments', {
  state: (): State => ({
    equipments: []
  }),
})

export { useEquipmentsStore }
