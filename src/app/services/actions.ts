import { Equipment } from "@/types/Equipment";
import { EquipmentState } from "@/types/EquipmentState";

export function getStateNameById(stateId: string, states: EquipmentState[]): string | undefined {
    const state = states.find((state) => state.id === stateId);
    return state ? state.name : undefined;
}

export async function getEquipment() {
    const equipmentResponse = await fetch("/data/equipment.json");
    const equipmentData: Equipment[] = await equipmentResponse.json();

    return equipmentData;
}

export async function getEquipmentModel() {
    const modelResponse = await fetch("/data/equipmentModel.json");
    const modelData = modelResponse.json();

    return modelData;
}

export async function getEquipmentState() {
    const statesResponse = await fetch("data/equipmentState.json");
    const statesData = statesResponse.json();

    return statesData;
}

export async function getEquipmentStateHistory() {
    const stateHistoryResponse = await fetch("/data/equipmentStateHistory.json");
    const stateHistoryData = stateHistoryResponse.json();

    return stateHistoryData;
}

export async function getEquipmentPositionHistory() {
    const positionHistoryResponse = await fetch("/data/equipmentPositionHistory.json");
    const positionHistoryData = positionHistoryResponse.json();

    return positionHistoryData;
}