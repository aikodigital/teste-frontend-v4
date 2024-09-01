export type EquipmentModelJson = {
  id: string,
  name: string,
  hourlyEarnings: Array<{
    equipmentStateId: string,
    value: number
  }>
}