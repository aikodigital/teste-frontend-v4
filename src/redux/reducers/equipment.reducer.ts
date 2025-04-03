import { createSlice } from '@reduxjs/toolkit';

interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

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
