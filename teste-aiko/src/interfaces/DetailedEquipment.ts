import { StateHistoryInterface } from "./StateHistory";

export interface DetailedEquipmentInterface {
    equipmentId?: string,
    currentState?: string,
    stateHistory?: StateHistoryInterface[],
    latestPosition?: number[],
    imgUrl?: string
}