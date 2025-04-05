import { createSlice } from '@reduxjs/toolkit';
import { EquipmentModel } from '~/types/equipment-model.types';

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
