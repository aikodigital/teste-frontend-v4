import equipmentPositionHistory from '@/assets/data/equipmentPositionHistory.json'
import EquipmentPositionHistory, { Position } from "../types/EquipmentPositionHistory";

export function getEquipmentLastPosition(id: string): Position | undefined {
    const equipmentHistory = getEquipmentPositionHistory(id);
    return equipmentHistory ? 
      equipmentHistory.positions[equipmentHistory.positions.length - 1] : undefined;
  }

export function listEquipmentPositionHistory(): EquipmentPositionHistory[] {
    return equipmentPositionHistory;
}

export function getEquipmentPositionHistory(id: string): EquipmentPositionHistory | undefined {
    return equipmentPositionHistory.find(p => p.equipmentId === id);
}