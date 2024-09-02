import { useQuery } from '@tanstack/react-query';
import { api } from './api';

export const fetchDashboard: any = async () => {
  const { data } = await api.get('/dashboard');

  // Calcular a produtividade
  return data.map((item: any) => {
    const hoursOperating = item.hoursOperating || 0;
    const totalHours = 24; // Horas totais do dia
    const productivityPercentage = (hoursOperating / totalHours) * 100;

    return {
      ...item,
      productivityPercentage,
    };
  });
};
