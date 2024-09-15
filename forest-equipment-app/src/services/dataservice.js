import axios from 'axios';

export const getEquipmentData = () => axios.get('/assets/data/equipment.json');
export const getEquipmentStateHistory = () => axios.get('/assets/data/equipmentStateHistory.json');
export const getEquipmentPositionHistory = () => axios.get('/assets/data/equipmentPositionHistory.json');
export const getEquipmentState = () => axios.get('/assets/data/equipmentState.json');
