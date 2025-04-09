import { equipamentModel } from "./equipament.models";
import { equipmentDataModel } from "./equipmentDataModel.model";
import { equipmentPositionHistoryModel } from "./equipmentPositionHistory.model";
import { equipamentStateModel } from "./equipmentState.model";
import { equipmentStateHistoryModel } from "./equipmentStateHistory.model";

export class equipamentDetailModel {
  constructor(
    public equipments: equipamentModel[],
    public equipmentModels: equipmentDataModel[],
    public equipmentStates: equipamentStateModel[],
    public equipmentStateHistory: equipmentStateHistoryModel[],
    public equipmentPositionHistory: equipmentPositionHistoryModel[]
  ) { }
}

