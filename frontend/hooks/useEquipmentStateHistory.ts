import { useQuery } from '@tanstack/react-query';
import { api } from './api';

export const fetchEquipmentStateHistory: any = async (equipmentId: string) => {
  const params = new URLSearchParams();
  if (!!equipmentId) params.append('equipment', equipmentId);

  const { data } = await api.get(`/equipment-state-history`, { params });
  return data;
};
