import { differenceInHours } from 'date-fns';
import type { StateHistory, EquipmentModel } from '../types/equipment';

export const calculateProductivity = (states: StateHistory[]): number => {
  if (states.length === 0) return 0;

  const operatingStateId = "0808344c-454b-4c36-89e8-d7687e692d57";
  const totalHours = differenceInHours(
    new Date(states[states.length - 1].date),
    new Date(states[0].date)
  );
  
  let operatingHours = 0;
  for (let i = 0; i < states.length - 1; i++) {
    if (states[i].equipmentStateId === operatingStateId) {
      operatingHours += differenceInHours(
        new Date(states[i + 1].date),
        new Date(states[i].date)
      );
    }
  };
  
  return (operatingHours / totalHours) * 100;
};

export const calculateEarnings = (states: StateHistory[], equipmentModel: EquipmentModel): number => {
  let totalEarnings = 0;

  for (let i = 0; i < states.length - 1; i++) {
    const hours = differenceInHours(
      new Date(states[i + 1].date),
      new Date(states[i].date)
    );
    
    const hourlyEarning = equipmentModel.hourlyEarnings.find(
      earning => earning.equipmentStateId === states[i].equipmentStateId
    );

    if (hourlyEarning) {
      totalEarnings += hours * hourlyEarning.value;
    };
  };

  return totalEarnings;
};