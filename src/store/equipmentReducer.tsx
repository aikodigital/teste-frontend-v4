import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

interface EquipmentState {
  equipmentList: Equipment[];
  loading: boolean;
  error: string | null;
}

const initialState: EquipmentState = {
  equipmentList: [],
  loading: false,
  error: null,
};

const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    fetchEquipmentStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEquipmentSuccess(state, action: PayloadAction<Equipment[]>) {
      state.equipmentList = action.payload;
      state.loading = false;
    },
    fetchEquipmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEquipmentStart, fetchEquipmentSuccess, fetchEquipmentFailure } = equipmentSlice.actions;
export default equipmentSlice.reducer;
