// models/equipment-state-history.ts
export interface EquipmentStateHistory {
  equipmentId: string;
  states: { date: string; equipmentStateId: string }[]; // Histórico de estados
}
