type Earning = {equipmentStateId: string, value: number};

export interface EquipmentModel{
    id: string;
    name: string;
    hourlyEarnings: Earning[]
}