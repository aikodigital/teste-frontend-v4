import { State } from "./state.model";
import { EquipamentModel } from './equipamentModel';

export interface Position  {
    date: Date,
    lat: number,
    lon: number,
    name: string,
    id: string,
    equipmentId: string,
    states: Array<State>
    equipmentModel: EquipamentModel


}