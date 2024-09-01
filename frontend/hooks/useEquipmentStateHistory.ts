import { useQuery } from '@tanstack/react-query';
import { api } from './api';

const fetchEquipmentStateHistory = async () => {
  const { data } = await api.get('/equipment-state-history');
  return data;
};

export const useEquipmentStateHistory = () => {
  return useQuery({
    queryKey: ['equipment-state-history'],
    queryFn: fetchEquipmentStateHistory,
  });
};
