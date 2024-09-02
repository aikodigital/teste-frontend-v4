import { useQuery } from '@tanstack/react-query';
import { api } from './api';

export const fetchDashboard: any = async () => {
  const { data } = await api.get('/dashboard');
  return data;
};
