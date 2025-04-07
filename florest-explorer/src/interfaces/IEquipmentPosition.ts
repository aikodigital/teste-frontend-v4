import IPositions from "./IPositions";

export default interface IEquipmentPosition {
    equipmentId: string;
    positions: [IPositions]
}

