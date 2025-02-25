import type { EquipmentModel } from "@dtos/EquipmentModel";

export const calculateTotalEarnings = (stateDurations: Record<string, number>, equipmentModel: EquipmentModel) => {
  return Object.entries(stateDurations).reduce((total, [stateId, duration]) => {
    const hourlyEarning = equipmentModel.hourlyEarnings.find(eqp => eqp.equipmentStateId === stateId);
    const earning = hourlyEarning ? hourlyEarning.value * duration : 0;
    return total + earning;
  }, 0);
}