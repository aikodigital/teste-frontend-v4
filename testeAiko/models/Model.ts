export interface Model {
 id: string
 name: string
 hourlyEarnings: {
  equipmentStateId: string
  value: number
 }[]
}