import equipments from "../../data/equipment.json";
import equipmentsModelsJson from "../../data/equipmentModel.json";
import equipmentsPositions from "../../data/equipmentPositionHistory.json";
import equipmentsStates from "../../data/equipmentState.json";
import equipmentsStateHistory from "../../data/equipmentStateHistory.json";

export const fetchEquipments = () => {
  return equipments;
};

export const fetchEquipmentModelById = (id: string) => {
  const filteredEquipement = equipmentsModelsJson.filter(
    (equipment) => id === equipment.id
  );

  return filteredEquipement;
};

export const fetchOrderedPositions = (id: string) => {
  const filteredEquipment = equipmentsPositions.filter(
    (equipment) => id === equipment.equipmentId
  );

  const positions = filteredEquipment[0].positions;

  positions.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  return positions;
};

export const fetchOrderedEquipmentState = (id: string) => {
  const filteredEquipment = equipmentsStateHistory.filter(
    (equipment) => id === equipment.equipmentId
  );

  const states = filteredEquipment[0].states;

  states.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  return states;
};

export const getCurrentStateData = (stateId: string) => {
  const state = equipmentsStates.filter((state) => stateId === state.id);

  return state[0];
};
