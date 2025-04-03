import { createSlice } from '@reduxjs/toolkit';

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

interface EquipmentPositionHistoryState {
  data: EquipmentPositionHistory[];
}

const initial: EquipmentPositionHistoryState = {
  data: [],
};

const equipmentPositionHistorySlice = createSlice({
  name: 'equipment-position-history',
  initialState: initial,
  reducers: {
    setEquipmentPositionHistory: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setEquipmentPositionHistory } =
  equipmentPositionHistorySlice.actions;
export default equipmentPositionHistorySlice.reducer;
