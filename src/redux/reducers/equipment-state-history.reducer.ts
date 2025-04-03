import { createSlice } from '@reduxjs/toolkit';

interface State {
  date: string;
  equipmentStateId: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: State[];
}

interface EquipmentStateHistoryState {
  data: EquipmentStateHistory[];
}

const initial: EquipmentStateHistoryState = {
  data: [],
};

const equipmentStateHistorySlice = createSlice({
  name: 'equipment-state-history',
  initialState: initial,
  reducers: {
    setEquipmentStateHistory: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setEquipmentStateHistory } = equipmentStateHistorySlice.actions;
export default equipmentStateHistorySlice.reducer;
