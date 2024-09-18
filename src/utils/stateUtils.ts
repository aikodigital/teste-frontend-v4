import equipmentState from '../data/equipmentState.json'
import type { EquipmentState } from '../types/Equipment'

// Função para obter o nome do estado pelo ID
export const getStateById = (id: string): { name: string; color: string } => {
  const stateMapping: { [key: string]: { name: string; color: string } } =
    equipmentState.reduce(
      (
        acc: { [key: string]: { name: string; color: string } },
        state: EquipmentState
      ) => {
        acc[state.id] = { name: state.name, color: state.color }
        return acc
      },
      {}
    )

  return stateMapping[id] || { name: 'Desconhecido', color: '#7f8c8d' }
}
