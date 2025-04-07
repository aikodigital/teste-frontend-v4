import axios from 'axios';
import { IEquipmentPositionHistory } from '../interfaces/equipmentPositionHistory';

export const fetchAllEquipmentsPositionHistory = async (): Promise<IEquipmentPositionHistory[]> => {
  const response = await axios.get<IEquipmentPositionHistory[]>('/data/equipmentPositionHistory.json');

  return new Promise((resolve) => {
    resolve(response.data);
  });
};

export const fetchEquipmentPositionHistoryById = async (
  id?: string,
): Promise<IEquipmentPositionHistory | undefined> => {
  if (!id) return undefined;

  const response = await fetchAllEquipmentsPositionHistory();

  return response.find((e) => e.equipmentId === id);
};
