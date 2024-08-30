export interface IEquipmentModel {
    id: string,
    name: string,
    hourlyEarnings: HourlyEarnings[],
}


export interface HourlyEarnings {
    equipmentStateId: string,
    value: number
}