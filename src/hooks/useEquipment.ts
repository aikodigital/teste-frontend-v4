import { states } from '../constants/states'
import { greenIcon, redIcon, yellowIcon } from '../constants/icons'
import type { EquipmentStateHistory } from '@/types/equipment';
import equipments from '@/assets/data/equipment.json'
import models from '@/assets/data/equipmentModel.json'

export function useEquipment() {
  const getStateById = (id: string) => {
    return states.find((state) => state.id === id) || null;
  }

  const getMarkerColor = (color: string) => {
    const colorMap = {
      '#2ecc71': greenIcon,
      '#f1c40f': yellowIcon,
      '#e74c3c': redIcon,
    };

    return colorMap[color];
  }

  const getStateHistory = (equipment: EquipmentStateHistory) => {
    return equipment.states.map((state) => ({
      ...state,
      states: getStateById(state.equipmentStateId)
    }))
  }

  const getEquipmentType = (id: string) => {
    const equip = equipments.find((eq) => eq.id === id)
    return equip
  }

  const getEquipmentModel = (id: string) => {
    const model = models.find((model) => model.id === id)
    return model
  }

  return {
    getMarkerColor,
    getStateById,
    getStateHistory,
    getEquipmentType,
    getEquipmentModel
  }
}
