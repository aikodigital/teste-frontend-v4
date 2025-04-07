import axios from 'axios';
import { IEquipment, IEquipmentDetail } from '../interfaces/equipment';
import { fetchEquipmentModelById } from './equipmentModel';
import { fetchEquipmentPositionHistoryById } from './equipmentPositionHistory';
import { fetchEquipmentStateHistoryById } from './equipmentStateHistory';
import { fetchEquipmentStateById } from './equipmentState';

export const fetchAllEquipments = async (): Promise<IEquipment[]> => {
  const response = await axios.get<IEquipment[]>('/data/equipment.json');

  return new Promise((resolve) => {
    resolve(response.data);
  });
};

export const fetchEquipmentDetail = async (id: string): Promise<IEquipmentDetail | undefined> => {
  if (!id) return undefined;

  const response = await fetchAllEquipments();

  if (response) {
    const eq = response.find((e) => e.id === id);
    if (eq) {
      const model = await fetchEquipmentModelById(eq?.equipmentModelId);
      const positionHistory = await fetchEquipmentPositionHistoryById(eq?.id);
      const stateHistory = await fetchEquipmentStateHistoryById(eq?.id);
      const lastStateHistoryId = stateHistory
        ? stateHistory.states[stateHistory?.states.length - 1].equipmentStateId
        : undefined;
      const state = await fetchEquipmentStateById(lastStateHistoryId);

      return {
        ...eq,
        model,
        positionHistory,
        stateHistory,
        state,
      };
    }
  }
  return undefined;
};
