import equipments from "../data/equipment.json";
import positionHistory from "../data/equipmentPositionHistory.json";
import stateHistory from "../data/equipmentStateHistory.json";
import models from "../data/equipmentModel.json";
import states from "../data/equipmentState.json";
import {
  EquipamentStates,
  EquipmentModel,
  EquipmentState,
  FormattedArrayPositions,
  Position,
  UpdateState,
} from "../types";

export const useEquipment = (equipmentId: string | undefined) => {
  const equipmentModelID = models.find(
    (model, index) => model.id === equipments[index].equipmentModelId
  ) as EquipmentModel;

  const positionsUpdate = getPositions(equipmentId);
  const formattedArrayPositions: FormattedArrayPositions[] =
    positionsUpdate.map((item) => {
      const date = new Date(item.date);
      const formattedDate = date.toISOString().split("T")[0];
      return { ...item, date: formattedDate };
    });

  const equipment = {
    equipmentId: equipmentId,
    positions: formattedArrayPositions,
    states: getStates(equipmentId, equipmentModelID?.id),
    totalMaintenance: getStates(equipmentId, equipmentModelID?.id)
      .totalMaintenance,
    totalStopped: getStates(equipmentId, equipmentModelID?.id).totalStopped,
    totalOperating: getStates(equipmentId, equipmentModelID?.id).totalOperating,
    totalProfit: getStates(equipmentId, equipmentModelID?.id).totalProfit,
  };
  return {
    equipment,
  };
};

const getPositions = (equipmentId: string | undefined) => {
  const positions: Position[] =
    positionHistory.find((position) => position.equipmentId === equipmentId)
      ?.positions || [];

  return positions;
};

const getStates = (
  equipmentId: string | undefined,
  equipmentModelID: string
) => {
  const equipamentStates: EquipamentStates[] =
    stateHistory.find((state) => state.equipmentId === equipmentId)?.states ||
    [];

  const statesResult: UpdateState[] = [];
  for (const equipment of equipamentStates) {
    const newState = states.find(
      (state) => state.id === equipment.equipmentStateId
    ) as EquipmentState;

    //pegando os value dos estados do equipamento
    const model: EquipmentModel = models.find(
      (model) => model.id === equipmentModelID
    )!;
    const valueState = model.hourlyEarnings.find(
      (m) => m.equipmentStateId === equipment.equipmentStateId
    );

    const updatedState: UpdateState = {
      ...newState,
      date: equipment.date,
      valueState: valueState?.value,
    };

    statesResult.push(updatedState);
  }

  const profit = valuesEquipment(statesResult);

  return {
    statesResult,
    ...profit,
  };
};
const valuesEquipment = (statesResult: UpdateState[]) => {
  const totalMaintenance: number = statesResult.reduce(
    (accumulator, currentObject) => {
      if (currentObject?.valueState && currentObject?.name === "Manutenção") {
        return accumulator + currentObject.valueState;
      }
      return accumulator;
    },
    0
  );

  //parado
  const totalStopped: number = statesResult.reduce(
    (accumulator, currentObject) => {
      if (currentObject?.valueState && currentObject?.name === "Parado") {
        return accumulator + currentObject.valueState;
      }
      return accumulator;
    },
    0
  );

  //Operando
  const totalOperating: number = statesResult.reduce(
    (accumulator, currentObject) => {
      if (currentObject?.valueState && currentObject?.name === "Operando") {
        return accumulator + currentObject.valueState;
      }
      return accumulator;
    },
    0
  );

  const calc = totalOperating + totalMaintenance + totalStopped;

  return {
    totalStopped,
    totalOperating,
    totalMaintenance,
    totalProfit: calc,
  };
};
