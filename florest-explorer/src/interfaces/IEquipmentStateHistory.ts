import IStates from "./IStates";

export default interface IEquipmentStateHistory {
    equipmentId: string;
    states: [IStates]
}

