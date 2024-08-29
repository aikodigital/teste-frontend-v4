import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EquipmentState {
  selectedEquipmentId: string | null;
  searchQuery: string | null;
}

const initialState: EquipmentState = {
  selectedEquipmentId: null,
  searchQuery: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setSelectedEquipmentId(state, action: PayloadAction<string | null>) {
      state.selectedEquipmentId = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string | null>) {
      state.searchQuery = action.payload;
    },
    resetSearchQuery(state) {
      state.searchQuery = null;
    },
  },
});

export const { setSelectedEquipmentId, setSearchQuery, resetSearchQuery } = equipmentSlice.actions;

export default equipmentSlice.reducer;
