export interface Equipment {
  id: string;
  name: string;
  model: string;
  latestPosition: { lat: number; lon: number } | null;
  latestState: { id: string; name: string; color: string } | null;
  productivity: number;
  earnings: number;
  stateHistory: Array<{ date: string; equipmentStateId: string }>;
}

export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}
