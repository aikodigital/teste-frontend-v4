import equipment from "@/data/equipment.json"
import equipmentModel from "@/data/equipmentModel.json"
import equipmentState from "@/data/equipmentState.json"
import equipmentStateHistory from "@/data/equipmentStateHistory.json"
import equipmentPositionHistory from "@/data/equipmentPositionHistory.json"
import { EquipmentFullData, equipmentModel as EquipmentModelType } from "@/interface/types"

export function getFullEquipmentData(): Promise<EquipmentFullData[]> {
  const fullData = equipment.map((item) => {
    const model = equipmentModel.find((m) => m.id === item.equipmentModelId)

    const stateHist = equipmentStateHistory.find(
      (h) => h.equipmentId === item.id
    )

    const lastStateEntry = stateHist?.states[stateHist.states.length - 1]
    const state = equipmentState.find((s) => s.id === lastStateEntry?.equipmentStateId)

    const earnings = model?.hourlyEarnings.find(
      (e) => e.equipmentStateId === lastStateEntry?.equipmentStateId
    )?.value || 0

    const posHist = equipmentPositionHistory.find((p) => p.equipmentId === item.id)
    const lastPos = posHist?.positions[posHist.positions.length - 1]

    return {
      id: item.id,
      name: item.name,
      modelName: model?.name || "Desconhecido",
      hourlyEarnings: earnings,
      stateName: state?.name || "Desconhecido",
      stateColor: state?.color || "gray",
      lastPosition: lastPos
        ? {
            lat: lastPos.lat,
            lon: lastPos.lon,
            date: new Date(lastPos.date),
          }
        : null,
      stateHistory: stateHist || { equipmentId: item.id, states: [] },
    }
  })

  return Promise.resolve(fullData)
}




