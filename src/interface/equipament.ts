import { IState, IStateHistoryState } from "./state";

export interface IEquipament {
    id: string;
    equipmentModelId: string;
    name: string;
}

export interface IEquipamentView {
    id: string;
    equipmentModelId: string;
    name: string;
    stateHistory: IStateHistoryState[];
    lastState: IState;
}