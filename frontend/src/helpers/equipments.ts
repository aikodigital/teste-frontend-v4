import {
  TypeEquipmentBasic,
  TypeEquipmentDetailed,
  TypeEquipmentModel,
  TypePosition,
  TypePositionHistory,
  TypeState,
  TypeStateHistory,
} from "@/types/equipmentTypes";
import equipments from "../../../data/equipment.json";
import equipmentModels from "../../../data/equipmentModel.json";
import equipmentPositionHistories from "../../../data/equipmentPositionHistory.json";
import equipmentStateHistories from "../../../data/equipmentStateHistory.json";
import equipmentStates from "../../../data/equipmentState.json";

export const getAllEquipments = (): TypeEquipmentBasic[] | null => {
  try {
    equipments.map((equipment: TypeEquipmentBasic) => {
      const lastPosition = getLastPosition(equipment.id);
      const currentState = getCurrentState(equipment.id);

      if (!lastPosition)
        throw new Error(`${equipment.name}, last position not found`);
      if (!currentState)
        throw new Error(`${equipment.name}, current state not found`);

      equipment.lastPosition = lastPosition;
      equipment.currentState = currentState;
    });

    return equipments;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getModel = (modelId: string): TypeEquipmentModel | null => {
  try {
    const model: TypeEquipmentModel | undefined = equipmentModels.find(
      (equipmentModel) => equipmentModel.id === modelId
    );

    if (!model) throw new Error("model not found");

    return model;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPositionHistory = (
  equipmentId: string
): TypePositionHistory | null => {
  try {
    const positionHistory = equipmentPositionHistories.find(
      (histories) => histories.equipmentId === equipmentId
    );

    if (!positionHistory) throw new Error("position History not found");

    return positionHistory;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getLastPosition = (equipmentId: string): TypePosition | null => {
  try {
    const positionHistory = getPositionHistory(equipmentId);

    if (!positionHistory) throw new Error("position history not found");

    return positionHistory.positions[positionHistory.positions.length - 1];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getStateHistory = (
  equipmentId: string
): TypeStateHistory | null => {
  try {
    const equipmentState: TypeStateHistory | undefined =
      equipmentStateHistories.find(
        (stateHisTory) => stateHisTory.equipmentId === equipmentId
      );

    equipmentState?.states.map((state) => {
      const stateIndex = equipmentStates.findIndex(
        (s) => s.id === state.equipmentStateId
      );

      state.name = equipmentStates[stateIndex].name;
      state.color = equipmentStates[stateIndex].color;
    });

    if (!equipmentState || !equipmentState.states[0].name)
      throw new Error("states history not found");

    return equipmentState;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrentState = (equipmentId: string): TypeState | null => {
  try {
    const stateHistory = getStateHistory(equipmentId);

    if (!stateHistory) throw new Error(`${equipmentId}, state not found`);

    return stateHistory.states[stateHistory.states.length - 1];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getEquipmentDetails = (
  equipment: TypeEquipmentBasic
): TypeEquipmentDetailed | null => {
  try {
    const equipmentDetails: TypeEquipmentDetailed = {
      ...equipment,
      positions: [],
      states: [],
    };

    const positionHistory = getPositionHistory(equipment.id);
    const stateHistory = getStateHistory(equipment.id);

    if (!positionHistory) throw new Error("failed to get the position history");
    if (!stateHistory) throw new Error("failed to get the state history");

    equipmentDetails.positions = [...positionHistory.positions];
    equipmentDetails.states = [...stateHistory.states];

    return equipmentDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
};
