import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface EquipmentHistoryState {
  [equipmentId: string]: Position[];
}

interface HistoryState {
  history: EquipmentHistoryState;
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  history: {},
  loading: false,
  error: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    fetchHistoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchHistorySuccess(state, action: PayloadAction<{ equipmentId: string; positions: Position[] }>) {
      const { equipmentId, positions } = action.payload;
      state.history[equipmentId] = positions;
      state.loading = false;
    },
    fetchHistoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchHistoryStart, fetchHistorySuccess, fetchHistoryFailure } = historySlice.actions;

export default historySlice.reducer;
