import { EquipmentStateHistory } from "./types";

export const calculateProductivity = (histories: EquipmentStateHistory[]) => {
  const totalHours = histories.reduce((total, history) => {
    return total + history.states.reduce((sum, stateRecord) => {
      const duration = new Date().getTime() - new Date(stateRecord.date).getTime();
      return sum + duration / (1000 * 60 * 60); 
    }, 0);
  }, 0);

  const operatingHours = histories.reduce((total, history) => {
    return total + history.states.reduce((sum, stateRecord) => {
      if (stateRecord.equipmentStateId === 'operando') {
        const duration = new Date().getTime() - new Date(stateRecord.date).getTime();
        return sum + duration / (1000 * 60 * 60);
      }
      return sum;
    }, 0);
  }, 0);

  return (operatingHours / totalHours) * 100;
};

export const calculateGain = (histories: EquipmentStateHistory[], hourlyRates: Record<string, number>) => {
  return histories.reduce((total, history) => {
    return total + history.states.reduce((sum, stateRecord) => {
      const duration = new Date().getTime() - new Date(stateRecord.date).getTime(); 
      const hours = duration / (1000 * 60 * 60);
      const rate = hourlyRates[stateRecord.equipmentStateId] || 0;
      return sum + hours * rate;
    }, 0);
  }, 0);
};
