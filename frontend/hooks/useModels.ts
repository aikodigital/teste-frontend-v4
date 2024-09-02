import { api } from './api';

export const fetchModels: any = async () => {
  const { data } = await api.get('/equipment-model');
  return data;
};
