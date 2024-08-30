import axios from "axios";
import { Equipment } from "@/types/Equipment";
import { EquipmentState } from "@/types/EquipmentState";

export function getStateNameById(stateId: string, states: EquipmentState[]): string | undefined {
    const state = states.find((state) => state.id === stateId);
    return state ? state.name : undefined;
}

export async function getEquipment() {
    const equipmentResponse = await getData("/data/equipment.json");
    const equipmentData: Equipment[] = await equipmentResponse;

    return equipmentData;
}

export async function getEquipmentModel() {
    const modelResponse = await getData("/data/equipmentModel.json");
    const modelData = modelResponse;

    return modelData;
}

export async function getEquipmentState() {
    const statesResponse = await getData("/data/equipmentState.json");
    const statesData = statesResponse;

    return statesData;
}

export async function getEquipmentStateHistory() {
    const stateHistoryResponse = await getData("/data/equipmentStateHistory.json");
    const stateHistoryData = stateHistoryResponse;

    return stateHistoryData;
}

export async function getEquipmentPositionHistory() {
    const positionHistoryResponse = await getData("/data/equipmentPositionHistory.json");
    const positionHistoryData = positionHistoryResponse;

    return positionHistoryData;
}

const getData = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Could not get data");
    }
  };