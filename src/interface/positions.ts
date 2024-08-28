import { IState } from "./state";

export interface IPosition {
    id: string;
    equipmentModelId: string;
    name: string;
    date: string;
    lat:  number;
    lon: number;
    state: IState
}