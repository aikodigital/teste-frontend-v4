import { useQuery } from '@tanstack/react-query';
import { api } from './api';

export const fetchStates: any = async () => {
  const { data } = await api.get('/equipment-state');
  return data;
};
