import { createSlice } from '@reduxjs/toolkit';
import equipmentData from '../data/equipment.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentModelData from '../data/equipmentModel.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';

interface EquipmentState {
  equipment: any[];
  equipmentState: any[];
  equipmentModel: any[];
  equipmentStateHistory: any[];
  equipmentPositionHistory: any[];
}

const initialState: EquipmentState = {
  equipment: equipmentData,
  equipmentState: equipmentStateData,
  equipmentModel: equipmentModelData,
  equipmentStateHistory: equipmentStateHistoryData,
  equipmentPositionHistory: equipmentPositionHistoryData,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},
});

export default equipmentSlice.reducer;
