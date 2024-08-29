import { defineStore } from 'pinia'
import type { Equipment, EquipmentPosition } from '~/models/Equipment'
import historic from '../../data/equipmentPositionHistory.json'
import equipment from '../../data/equipment.json'

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
