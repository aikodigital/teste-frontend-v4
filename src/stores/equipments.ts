import { defineStore } from 'pinia'
import historic from '../../data/equipmentPositionHistory.json'
import equipment from '../../data/equipment.json'
import type { Equipment, EquipmentPosition } from '~/models/Equipment'

interface State {
  equipments: Array<Equipment>
  positionHistory: Array<EquipmentPosition>
}

const useEquipmentsStore = defineStore('Equipments', {
  state: (): State => ({
    equipments: equipment,
    positionHistory: historic,
  }),
})

export { useEquipmentsStore }
