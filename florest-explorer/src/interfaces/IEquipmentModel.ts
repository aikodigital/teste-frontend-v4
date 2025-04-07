import IEquipmentModelEarnings from "./IEquipmentModelEarnings";

export default interface IEquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: [IEquipmentModelEarnings];
}
