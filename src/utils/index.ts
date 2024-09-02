import equipmentState from "../data/equipmentState.json";
import { CompleteEquipmentData, EquipmentData } from "../types";
import equipments from "./../data/equipment.json";
import equipmentModel from "./../data/equipmentModel.json";
import equipmentPositionHistory from "./../data/equipmentPositionHistory.json";
import equipmentStateHistory from "./../data/equipmentStateHistory.json";

export const joinEquipmentData = (): CompleteEquipmentData => {
  const completeEquipmentData = Object.values(equipments).map((equipment) => {
    const correctPosition = Object.values(equipmentPositionHistory).find(
      (value) => value.equipmentId === equipment.id
    );

    const correctState = Object.values(equipmentStateHistory).find(
      (value) => value.equipmentId === equipment.id
    );

    const modelData = Object.values(equipmentModel).find(
      (value) => value.id === equipment.equipmentModelId
    );

    return {
      equipmentName: equipment.name,
      ...modelData!,
      ...correctPosition!,
      ...correctState!,
    };
  });

  return completeEquipmentData;
};

export const addStateInfoToEquipmentData = (equipment: EquipmentData) => {
  return equipment.states.map((state) => {
    const stateName = Object.values(equipmentState).find(
      (value) => value.id === state.equipmentStateId
    );

    return {
      ...state,
      ...stateName,
    };
  });
};
