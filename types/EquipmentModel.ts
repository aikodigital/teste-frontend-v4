import type EquipmentModelHourlyEarning from "./EquipmentModelHourlyEarning"

export default interface EquipmentModel {
  id: string
  name: string
  hourlyEarnings: EquipmentModelHourlyEarning[]
}
