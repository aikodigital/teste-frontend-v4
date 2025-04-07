import { mockEquipments } from "../../public/data/mockEquipment";
import { mockEquipmentPositionHistory } from "../../public/data/mockEquipmentPositionHistory";
import { mockEquipmentStateHistory } from "../../public/data/mockEquipmentStateHistory";
import { EquipmentStateName } from "../types/equipment";
import { mockEquipmentModels } from "../../public/data/mockEquipmentModel";
import { mockEquipmentState } from "../../public/data/mockEquipmentState";

export function getEquipmentsMerged() {
  return mockEquipments.map((eq) => {
    const model = mockEquipmentModels.find((m) => m.id === eq.equipmentModelId);
    const stateHist = mockEquipmentStateHistory.find(
      (s) => s.equipmentId === eq.id,
    );
    const lastStateId =
      stateHist?.states[stateHist.states.length - 1]?.equipmentStateId;
    const state = mockEquipmentState.find((s) => s.id === lastStateId);
    const posHist = mockEquipmentPositionHistory.find(
      (p) => p.equipmentId === eq.id,
    );
    const lastPosition = posHist?.positions[posHist.positions.length - 1];

    return {
      id: eq.id,
      name: eq.name,
      model: model?.name || "Modelo Desconhecido",
      state: (state?.name as EquipmentStateName) ?? "Estado Desconhecido",
      color: state?.color || "#ccc",
      position: lastPosition
        ? ([lastPosition.lat, lastPosition.lon] as [number, number])
        : ([0, 0] as [number, number]),
      hourlyEarnings: model?.hourlyEarnings || 0,
      stateHistory: stateHist?.states || [],
      positionHistory: posHist?.positions || [],
      equipmentStates: mockEquipmentState,
    };
  });
}
