import { createContext, useContext, useMemo } from 'react'

import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentPositionHistory,
} from '@/types'
import equipmentData from '../../public/data/equipment.json'
import { useEquipmentFilters } from '@/hooks/useEquipmentFilters'
import equipmentModelData from '../../public/data/equipmentModel.json'
import equipmentStateData from '../../public/data/equipmentState.json'
import equipmentStateHistoryData from '../../public/data/equipmentStateHistory.json'
import equipmentPositionHistoryData from '../../public/data/equipmentPositionHistory.json'

interface EquipmentContextType {
  equipment: Equipment[]
  models: Map<string, string>
  states: Map<string, string>
  lastStates: Map<string, string>
  lastPositions: Map<string, { lat: number; lon: number }>
  filteredEquipment: Equipment[]
  equipmentPositions: {
    id: string
    name: string
    modelId: string
    position: [number, number]
    currentStatus: string
  }[]
  statusFilter: string
  setStatusFilter: (value: string) => void
  modelFilter: string
  setModelFilter: (value: string) => void
  searchTerm: string
  setSearchTerm: (value: string) => void
  stateColors: Map<string, string>
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(
  undefined,
)

export const useEquipment = () => {
  const context = useContext(EquipmentContext)
  if (!context) {
    throw new Error('useEquipment must be used within an EquipmentProvider')
  }
  return context
}

export const EquipmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    statusFilter,
    setStatusFilter,
    modelFilter,
    setModelFilter,
    searchTerm,
    setSearchTerm,
  } = useEquipmentFilters()

  const models = useMemo(
    () =>
      new Map<string, string>(
        (equipmentModelData as EquipmentModel[]).map((model) => [
          model.id,
          model.name,
        ]),
      ),
    [],
  )

  const states = useMemo(
    () =>
      new Map<string, string>(
        (equipmentStateData as EquipmentState[]).map((state) => [
          state.id,
          state.name,
        ]),
      ),
    [],
  )

  const lastStates = useMemo(
    () =>
      new Map<string, string>(
        (equipmentStateHistoryData as EquipmentStateHistory[]).map(
          (history) => {
            const lastState = history.states[history.states.length - 1]
            return [history.equipmentId, lastState.equipmentStateId]
          },
        ),
      ),
    [],
  )

  const lastPositions = useMemo(
    () =>
      new Map<string, { lat: number; lon: number }>(
        (equipmentPositionHistoryData as EquipmentPositionHistory[]).map(
          (history) => {
            const lastPosition = history.positions[history.positions.length - 1]
            return [
              history.equipmentId,
              { lat: lastPosition.lat, lon: lastPosition.lon },
            ]
          },
        ),
      ),
    [],
  )

  const filteredEquipment = useMemo(() => {
    return (equipmentData as Equipment[]).filter((equipment) => {
      const matchesStatus =
        !statusFilter || lastStates.get(equipment.id) === statusFilter
      const matchesModel =
        !modelFilter || equipment.equipmentModelId === modelFilter
      const matchesSearch = equipment.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      return matchesStatus && matchesModel && matchesSearch
    })
  }, [statusFilter, modelFilter, searchTerm, lastStates])

  const equipmentPositions = useMemo(() => {
    return filteredEquipment
      .map((equipment) => {
        const position = lastPositions.get(equipment.id)
        const lastState = lastStates.get(equipment.id)
        return {
          id: equipment.id,
          name: equipment.name,
          modelId: equipment.equipmentModelId,
          position: position
            ? ([position.lat, position.lon] as [number, number])
            : undefined,
          currentStatus: states.get(lastState || '') || 'Desconhecido',
        }
      })
      .filter(
        (
          item,
        ): item is {
          id: string
          name: string
          modelId: string
          position: [number, number]
          currentStatus: string
        } => item.position !== undefined,
      )
  }, [filteredEquipment, lastStates, states, lastPositions])

  const stateColors = useMemo(
    () =>
      new Map<string, string>(
        (equipmentStateData as EquipmentState[]).map((state) => [
          state.id,
          state.color,
        ]),
      ),
    [],
  )

  const value = {
    equipment: equipmentData as Equipment[],
    models,
    states,
    lastStates,
    lastPositions,
    filteredEquipment,
    equipmentPositions,
    statusFilter,
    setStatusFilter,
    modelFilter,
    setModelFilter,
    searchTerm,
    setSearchTerm,
    stateColors,
  }

  return (
    <EquipmentContext.Provider value={value}>
      {children}
    </EquipmentContext.Provider>
  )
}
