import { createSlice } from '@reduxjs/toolkit';

interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
}

interface EquipmentModelState {
  data: EquipmentModel[];
}

const initial: EquipmentModelState = {
  data: [],
};

const equipmentModelSlice = createSlice({
  name: 'equipment-model',
  initialState: initial,
  reducers: {
    setEquipmentModels: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setEquipmentModels } = equipmentModelSlice.actions;
export default equipmentModelSlice.reducer;
