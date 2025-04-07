import axios from 'axios';
import { IEquipmentState } from '../interfaces/equipmentState';

export const fetchAllEquipmentsStates = async (): Promise<IEquipmentState[]> => {
  const response = await axios.get<IEquipmentState[]>('/data/equipmentState.json');

  return new Promise((resolve) => {
    resolve(response.data);
  });
};

export const fetchEquipmentStateById = async (id?: string): Promise<IEquipmentState | undefined> => {
  if (!id) return undefined;

  const response = await fetchAllEquipmentsStates();

  return response.find((e) => e.id === id);
};
