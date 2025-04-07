import axios from 'axios';
import { IEquipmentModel } from '../interfaces/equipmentModel';

export const fetchAllEquipmentsModels = async (): Promise<IEquipmentModel[]> => {
  const response = await axios.get<IEquipmentModel[]>('/data/equipmentModel.json');

  return new Promise((resolve) => {
    resolve(response.data);
  });
};

export const fetchEquipmentModelById = async (id?: string): Promise<IEquipmentModel | undefined> => {
  if (!id) return undefined;

  const response = await fetchAllEquipmentsModels();

  return response.find((e) => e.id === id);
};
