import { states } from '../constants/states'
import { greenIcon, redIcon, yellowIcon } from '../constants/icons'

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

  return {
    getMarkerColor,
    getStateById
  }
}
