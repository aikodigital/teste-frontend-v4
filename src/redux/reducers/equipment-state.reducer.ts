import { createSlice } from '@reduxjs/toolkit';

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface EquipmentStateState {
  data: EquipmentState[];
}

const initial: EquipmentStateState = {
  data: [],
};

const equipmentStateSlice = createSlice({
  name: 'equipment-state',
  initialState: initial,
  reducers: {
    setEquipmentState: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setEquipmentState } = equipmentStateSlice.actions;
export default equipmentStateSlice.reducer;
