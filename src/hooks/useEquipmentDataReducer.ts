import { useEffect, useReducer } from 'react'

import equipment from '../data/equipment.json'
import equipmentModelJson from '../data/equipmentModel.json'
import equipmentPositionHistoryJson from '../data/equipmentPositionHistory.json'
import equipmentStateJson from '../data/equipmentState.json'
import equipmentStateHistoryJson from '../data/equipmentStateHistory.json'

interface BaseDate {
  date: string
}
interface Position extends BaseDate {
  lat: number
  lon: number
}

interface State extends BaseDate {
  equipmentState:
    | {
        id: string
        name: string
        color: string
      }
    | undefined
  equipmentStateId: string
}

interface FullDataProps {
  id: string
  equipmentModelId: string
  name: string
  positionHistory:
    | {
        equipmentId: string
        positions: {
          date: string
          lat: number
          lon: number
        }[]
      }
    | undefined
  fullStateHistory: {
    equipmentState:
      | {
          id: string
          name: string
          color: string
        }
      | undefined
    date: string
    equipmentStateId: string
  }[]
  model:
    | {
        id: string
        name: string
        hourlyEarnings: {
          equipmentStateId: string
          value: number
        }[]
      }
    | undefined
  lastPosition: Position
  lastState: State
}

type Filter = {
  modelId?: string
  stateId?: string
}

type StateType = {
  equipmentFullData: FullDataProps[]
  equipmentPositionCenter: { lat: number; lon: number }
  filteredEquipmentData: FullDataProps[]
  filters: Filter
}

type Action =
  | { type: 'SET_EQUIPMENT_DATA' }
  | { type: 'FILTER_BY_MODEL'; payload: string }
  | { type: 'FILTER_BY_STATE'; payload: string }
  | { type: 'FILTER'; payload: { stateId?: string; modelId?: string } }
  | { type: 'RESET_FILTERS' }

const initialState: StateType = {
  equipmentFullData: [],
  equipmentPositionCenter: { lat: 0, lon: 0 },
  filteredEquipmentData: [],
  filters: {},
}

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case 'SET_EQUIPMENT_DATA': {
      const findMostRecentDate = (positions: Position[] | State[]) => {
        return positions.reduce((mostRecent, current) => {
          const currentDate = new Date(current.date)
          const mostRecentDate = new Date(mostRecent.date)
          return currentDate > mostRecentDate ? current : mostRecent
        })
      }

      const equipmentStateMap = new Map(
        equipmentStateJson.map((state) => [state.id, state]),
      )
      const equipmentModelMap = new Map(
        equipmentModelJson.map((state) => [state.id, state]),
      )
      const equipmentStateHistoryMap = new Map(
        equipmentStateHistoryJson.map((state) => [state.equipmentId, state]),
      )
      const equipmentPositionHistoryMap = new Map(
        equipmentPositionHistoryJson.map((state) => [state.equipmentId, state]),
      )

      const equipmentFullData: FullDataProps[] = equipment.map((equipment) => {
        const model = equipmentModelMap.get(equipment.equipmentModelId)
        const positionHistory = equipmentPositionHistoryMap.get(equipment.id)
        const stateHistory = equipmentStateHistoryMap.get(equipment.id)

        const fullStateHistory = stateHistory!.states.map((state) => {
          const equipmentState = equipmentStateMap.get(state.equipmentStateId)

          return {
            ...state,
            equipmentState,
          }
        })

        const lastPosition = findMostRecentDate(
          positionHistory!.positions,
        ) as Position

        const lastState = findMostRecentDate(fullStateHistory) as State

        return {
          ...equipment,
          model,
          positionHistory,
          fullStateHistory,
          lastPosition,
          lastState,
        }
      })

      const equipmentPositionsAcc = equipmentFullData.reduce(
        (acc, equip) => {
          acc.lat += equip.lastPosition.lat
          acc.lon += equip.lastPosition.lon
          return acc
        },
        { lat: 0, lon: 0 },
      )

      const equipmentPositionCenter = {
        lat: equipmentPositionsAcc.lat / equipmentFullData.length,
        lon: equipmentPositionsAcc.lon / equipmentFullData.length,
      }

      return {
        ...state,
        equipmentFullData,
        equipmentPositionCenter,
        filteredEquipmentData: equipmentFullData,
      }
    }

    case 'FILTER': {
      const filteredEquipmentData = state.equipmentFullData.filter((equip) => {
        let doesFilterMatch = true

        if (action.payload.modelId && action.payload.modelId !== undefined) {
          doesFilterMatch =
            doesFilterMatch && equip.model?.id === action.payload.modelId
        }

        if (action.payload.stateId) {
          doesFilterMatch =
            doesFilterMatch &&
            equip.lastState.equipmentState?.id === action.payload.stateId
        }

        return doesFilterMatch
      })

      return {
        ...state,
        filteredEquipmentData,
        filters: {
          ...state.filters,
          stateId: action.payload.stateId,
          modelId: action.payload.modelId,
        },
      }
    }

    case 'RESET_FILTERS': {
      return {
        ...state,
        filteredEquipmentData: state.equipmentFullData,
        filters: {},
      }
    }
    default:
      return state
  }
}

const useEquipmentData = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'SET_EQUIPMENT_DATA' })
  }, [])

  const filterItems = ({
    stateId,
    modelId,
  }: {
    stateId?: string
    modelId?: string
  }) => {
    dispatch({ type: 'FILTER', payload: { stateId, modelId } })
  }

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }

  return {
    ...state,
    resetFilters,
    filterItems,
  }
}

export default useEquipmentData
