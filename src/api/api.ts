import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getEquipments = async () => {
  const response = await api.get('/equipment');
  return response.data;
};

export const getEquipmentStates = async () => {
  const response = await api.get('/equipmentState');
  return response.data;
};

export const getEquipmentStateHistory = async (equipmentId: string) => {
  const response = await api.get(`/equipmentStateHistory?equipmentId=${equipmentId}`);
  return response.data;
};

export const getAllEquipmentLatestState = async () => {
  const response = await api.get('/equipmentStateHistory');
  const histories = response.data;

  const latestStates = histories.map((history: any) => {
    const lastState = history.states[history.states.length - 1];
    return {
      equipmentId: history.equipmentId,
      ...lastState,
    };
  });

  return latestStates;
};



export const getEquipmentPositionHistory  = async () => {
    const response = await api.get('/equipmentPositionHistory');
    return response.data;
  };
  

  
  

