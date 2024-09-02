export interface PositionHistory {
 equipmentId: string  
 positions: {
  date: string
  latitude: number
  longitude: number
 }[]
}