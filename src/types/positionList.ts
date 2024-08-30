export interface IPositionItem {
  equipment: Equipment;
  position: Position;
}
interface Position {
  date: string;
  lat: number;
  lon: number;
}
interface Equipment {
  name: string;
  modelName: string;
  equipmentModelId: string;
  id: string;
  currentState: {
    date: string
    name: string
    id: string
    color: string
  }
}