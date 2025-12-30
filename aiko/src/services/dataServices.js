// services/dataService.js
import equipment from "../data/equipment.json";
import equipmentState from "../data/equipmentState.json";
import positionHistory from "../data/equipmentPositionHistory.json";
import stateHistory from "../data/equipmentStateHistory.json";

export function loadData() {
  return {
    equipment,
    equipmentState,
    positionHistory,
    stateHistory,
  };
}
