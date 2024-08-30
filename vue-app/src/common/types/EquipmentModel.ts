type HourlyEarning = {
    value: number,
    equipmentStateId: string
}

type EquipmentModel = {
    id: string,
    name: string,
    hourlyEarnings: HourlyEarning[]
}

export default EquipmentModel;