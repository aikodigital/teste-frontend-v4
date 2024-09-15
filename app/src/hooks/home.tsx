import { useEffect, useMemo, useState } from "react"
import {
  AggregatedEquipment,
  Equipment,
  EquipmentModel,
  equipmentPositionHistory,
  equipmentState,
  equipmentStateHistory
} from "@/helpers/types"

export function useHomeHooks() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AggregatedEquipment[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<AggregatedEquipment | null>(null)

  const centralPosition = useMemo(() => {
    const positions = data.map(item => item.currentPosition)
    const totalPositions = positions.length;

    if (totalPositions === 0) return null;

    const totalLat = positions.reduce((sum, pos) => sum + (pos?.lat ?? 0), 0);
    const totalLon = positions.reduce((sum, pos) => sum + (pos?.lon ?? 0), 0);

    const centerLat = totalLat / totalPositions;
    const centerLon = totalLon / totalPositions;

    return { lat: centerLat, lon: centerLon };
  }, [data])

  async function getEquipment(signal?: AbortSignal) {
    const response = await fetch('/api/equipment', { signal })
    if (response.ok) {
      const res = await response.json()
      return res as Equipment[]
    }
  }

  async function getEquipmentModel(signal?: AbortSignal) {
    const response = await fetch('/api/equipment/model', { signal })
    if (response.ok) {
      const res = await response.json()
      return res as EquipmentModel[]
    }
  }

  async function getEquipmentPositionHistory(signal?: AbortSignal) {
    const response = await fetch('/api/equipment/position/history', { signal })
    if (response.ok) {
      const res = await response.json()
      return res as equipmentPositionHistory[]
    }
  }

  async function getEquipmentState(signal?: AbortSignal) {
    const response = await fetch('/api/equipment/state', { signal })
    if (response.ok) {
      const res = await response.json()
      return res as equipmentState[]
    }
  }

  async function getEquipmentStateHistory(signal?: AbortSignal) {
    const response = await fetch('/api/equipment/state/history', { signal })
    if (response.ok) {
      const res = await response.json()
      return res as equipmentStateHistory[]
    }
  }

  function aggregateEquipmentData(
    equipmentList: Equipment[],
    equipmentModels: EquipmentModel[],
    equipmentPositions: equipmentPositionHistory[],
    equipmentStates: equipmentState[],
    equipmentStateHistories: equipmentStateHistory[]
  ) {
    const modelMap = new Map(equipmentModels.map(model => [model.id, model]));
    const stateMap = new Map(equipmentStates.map(state => [state.id, state]));

    const data = equipmentList.map(equipment => {
      const model = modelMap.get(equipment.equipmentModelId);

      const positionHistory = equipmentPositions.find(pos => pos.equipmentId === equipment.id)
        ?.positions || [];
      const currentPosition = positionHistory.length > 0
        ? positionHistory[positionHistory.length - 1]
        : null;

      const stateHistory = equipmentStateHistories.find(
        stateHist => stateHist.equipmentId === equipment.id
      )?.states?.reverse() || [];
      const currentStateId = stateHistory.length > 0
        ? stateHistory[0].equipmentStateId
        : null;
      const currentState = currentStateId ? stateMap.get(currentStateId) : null;

      return {
        id: equipment.id,
        name: equipment.name,
        model: model ? {
          id: model.id,
          name: model.name,
          hourlyEarnings: model.hourlyEarnings,
        } : null,
        currentPosition: currentPosition ? {
          lat: currentPosition.lat,
          lon: currentPosition.lon,
          date: currentPosition.date,
        } : null,
        currentState: currentState ? {
          id: currentState.id,
          name: currentState.name,
          color: currentState.color,
        } : null,
        stateHistory: stateHistory.map(state => ({
          date: state.date,
          state: stateMap.get(state.equipmentStateId) ?? null,
        })),
        positionHistory: positionHistory,
      };
    });
    setData(data)
  }

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    setLoading(true)
    Promise.all([
      getEquipment(signal),
      getEquipmentModel(signal),
      getEquipmentPositionHistory(signal),
      getEquipmentState(signal),
      getEquipmentStateHistory(signal),
    ])
      .then(([equipments, equipmentModels, positionHistories, equipmentStates, stateHistories]) => {
        aggregateEquipmentData(
          equipments ?? [],
          equipmentModels ?? [],
          positionHistories ?? [],
          equipmentStates ?? [],
          stateHistories ?? []
        )
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Request was aborted');
        } else {
          console.error('An error occurred:', error);
        }
      })
      .finally(() => setLoading(false))

    return () => { controller.abort() }
  }, [])

  return { loading, centralPosition, data, selectedEquipment, setSelectedEquipment }
}
