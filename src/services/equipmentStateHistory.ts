import axios from 'axios';
import { IEquipmentStateHistory } from '../interfaces/equipmentStateHistory';

export const fetchAllEquipmentsStatesHistory = async (): Promise<IEquipmentStateHistory[]> => {
  const response = await axios.get<IEquipmentStateHistory[]>('/data/equipmentStateHistory.json');

  return new Promise((resolve) => {
    resolve(response.data);
  });
};

export const fetchEquipmentStateHistoryById = async (id?: string): Promise<IEquipmentStateHistory | undefined> => {
  if (!id) return undefined;

  const response = await fetchAllEquipmentsStatesHistory();

  return response.find((e) => e.equipmentId === id);
};
