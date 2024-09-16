import { Equipment } from "@/interfaces";
import equipments from "../../data/equipment.json";
import equipmentsModelsJson from "../../data/equipmentModel.json";
import equipmentsPositions from "../../data/equipmentPositionHistory.json";
import equipmentsStates from "../../data/equipmentState.json";
import equipmentsStateHistory from "../../data/equipmentStateHistory.json";

export const fetchEquipments = () => {
  return equipments;
};

export const fetchEquipmentModel = (modelId: string) => {
  const equipmentModel = equipmentsModelsJson.filter(
    (equipment) => modelId === equipment.id
  );

  return equipmentModel[0];
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

export const fetchOrderedEquipmentState = (
  id: string,
  startDate?: string,
  endDate?: string
) => {
  const filteredEquipment = equipmentsStateHistory.filter(
    (equipment) => id === equipment.equipmentId
  );

  if (filteredEquipment.length === 0) {
    return [];
  }

  const states = filteredEquipment[0].states;

  const filteredStates = states.filter((state) => {
    const stateDate = new Date(state.date);

    if (startDate && endDate) {
      return stateDate >= new Date(startDate) && stateDate <= new Date(endDate);
    } else if (startDate) {
      return stateDate >= new Date(startDate);
    } else if (endDate) {
      return stateDate <= new Date(endDate);
    }

    return true;
  });

  filteredStates.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  return filteredStates;
};

export const fetchOrderedEquipmentPositions = (
  id: string,
  startDate?: string,
  endDate?: string
) => {
  const filteredEquipmentPositions = equipmentsPositions.filter(
    (equipment) => id === equipment.equipmentId
  )[0].positions;

  const filteredPositions = filteredEquipmentPositions.filter((position) => {
    const positionDate = new Date(position.date);

    if (startDate && endDate) {
      return (
        positionDate >= new Date(startDate) && positionDate <= new Date(endDate)
      );
    } else if (startDate) {
      return positionDate >= new Date(startDate);
    } else if (endDate) {
      return positionDate <= new Date(endDate);
    }

    return true;
  });

  return filteredPositions;
};

export const getCurrentStateData = (stateId: string) => {
  const state = equipmentsStates.filter((state) => stateId === state.id);

  return state[0];
};

export const fetchEquipmentsByState = (stateId: string) => {
  const allEquipments = fetchEquipments();

  const equipmentsFilteredByState: Equipment[] = [];

  allEquipments.forEach((equipment) => {
    const lastState = fetchOrderedEquipmentState(equipment.id)[0];

    if (lastState?.equipmentStateId === stateId) {
      equipmentsFilteredByState.push(equipment);
    }
  });

  return equipmentsFilteredByState;
};

export const filterEquipments = ({
  modelId,
  stateId,
  name,
}: {
  modelId?: string;
  stateId?: string;
  name?: string;
}) => {
  let filteredEquipments = fetchEquipments();

  if (modelId !== "Todos") {
    filteredEquipments = filteredEquipments.filter(
      (equipment) => equipment.equipmentModelId === modelId
    );
  }

  if (stateId !== "Todos") {
    filteredEquipments = filteredEquipments.filter((equipment) => {
      const lastState = fetchOrderedEquipmentState(equipment.id)[0];
      return lastState?.equipmentStateId === stateId;
    });
  }

  if (name && name.trim() !== "") {
    filteredEquipments = filteredEquipments.filter((equipment) =>
      equipment.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return filteredEquipments;
};

export const calculateProductivity = (
  id: string,
  startDate?: string,
  endDate?: string
) => {
  const equipmentStates = fetchOrderedEquipmentState(id, startDate, endDate);

  if (equipmentStates.length === 0) {
    return 0;
  }

  let productiveHours = 0;
  let totalHours = 0;

  for (let i = 0; i < equipmentStates.length - 1; i++) {
    const currentState = equipmentStates[i];
    const nextState = equipmentStates[i + 1];

    const currentStateDate = new Date(currentState.date);
    const nextStateDate = new Date(nextState.date);

    const hoursInState =
      (nextStateDate.getTime() - currentStateDate.getTime()) / (1000 * 60 * 60);

    totalHours += hoursInState;

    if (
      currentState.equipmentStateId === "0808344c-454b-4c36-89e8-d7687e692d57"
    ) {
      productiveHours += hoursInState;
    }
  }

  const productivity = (productiveHours / totalHours) * 100;

  return productivity;
};

export const calculateStateHours = (
  equipmentStateHistory: { date: string; equipmentStateId: string }[]
) => {
  type EquipmentStateHours = {
    operating: number;
    stopped: number;
    maintenance: number;
  };

  type EquipmentStateId = keyof EquipmentStateHours;

  const stateMap: Record<string, EquipmentStateId> = {
    "0808344c-454b-4c36-89e8-d7687e692d57": "operating",
    "baff9783-84e8-4e01-874b-6fd743b875ad": "stopped",
    "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f": "maintenance",
  };

  equipmentStateHistory.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const result: {
    operating: number;
    stopped: number;
    maintenance: number;
  } = {
    operating: 0,
    stopped: 0,
    maintenance: 0,
  };

  for (let i = 1; i < equipmentStateHistory.length; i++) {
    const currentRecord = equipmentStateHistory[i];
    const previousRecord = equipmentStateHistory[i - 1];

    const currentStateId = currentRecord.equipmentStateId;

    const currentTime = new Date(currentRecord.date).getTime();
    const previousTime = new Date(previousRecord.date).getTime();
    const duration = (currentTime - previousTime) / (1000 * 60 * 60);

    const stateKey = stateMap[currentStateId];

    if (stateKey) {
      result[stateKey] += duration;
    }
  }

  return result;
};

export const calculateProfit = ({
  operatingHours,
  stoppedHours,
  maintanenceHours,
  modelId,
}: {
  operatingHours: number;
  maintanenceHours: number;
  stoppedHours: number;
  modelId: string;
}) => {
  const modelData = fetchEquipmentModel(modelId);

  const operatingProfit =
    operatingHours *
    modelData.hourlyEarnings.filter(
      (model) =>
        model.equipmentStateId === "0808344c-454b-4c36-89e8-d7687e692d57"
    )[0].value;

  const maintanceLoss =
    maintanenceHours *
    modelData.hourlyEarnings.filter(
      (model) =>
        model.equipmentStateId === "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
    )[0].value;

  const stoppedLoss =
    stoppedHours *
    modelData.hourlyEarnings.filter(
      (model) =>
        model.equipmentStateId === "baff9783-84e8-4e01-874b-6fd743b875ad"
    )[0].value;

  return operatingProfit + maintanceLoss + stoppedLoss;
};
