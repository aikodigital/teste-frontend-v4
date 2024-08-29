import { createSlice } from '@reduxjs/toolkit';

export const equipmentStateSlice = createSlice({
  name: 'equipmentState',
  initialState: {
    data: [],
  },
  reducers: {
    setEquipmentState: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setEquipmentState } = equipmentStateSlice.actions;
export default equipmentStateSlice.reducer;