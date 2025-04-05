import { createSlice } from '@reduxjs/toolkit';
import { Equipment } from '~/types/equipment.types';

interface EquipmentState {
  data: Equipment[];
}

const initial: EquipmentState = {
  data: [],
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: initial,
  reducers: {
    setEquipments: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setEquipments } = equipmentSlice.actions;

export default equipmentSlice.reducer;
