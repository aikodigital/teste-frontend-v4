import { createSlice } from '@reduxjs/toolkit';

interface MapState {
  selectedEquipmentId: string | null;
}

const initialState: MapState = {
  selectedEquipmentId: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    selectEquipment(state, action) {
      state.selectedEquipmentId = action.payload;
    },
  },
});

export const { selectEquipment } = mapSlice.actions;
export default mapSlice.reducer;
