import { api } from './api';

export const fetchEquipmentPositionHistory: any = async () => {
  const { data } = await api.get('/equipment-position-history');
  return data;
};
