import { createSlice } from '@reduxjs/toolkit';
import {
  EquipmentStateHistory,
  State,
} from '~/types/equipment-state-history.types';
import { formatDate } from '~/utils/format-date';

interface EquipmentStateHistoryState {
  data: EquipmentStateHistory[];
}

const initial: EquipmentStateHistoryState = {
  data: [],
};

const equipmentStateHistorySlice = createSlice({
  name: 'equipment-state-history',
  initialState: initial,
  reducers: {
    setEquipmentStateHistory: (state, action) => {
      state.data = action.payload.map((item: EquipmentStateHistory) => ({
        ...item,
        states: item.states
          .map((state: State) => ({
            ...state,
            date: formatDate(state.date),
          }))
          .sort(
            (a: State, b: State) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
      }));
    },
  },
});

export const { setEquipmentStateHistory } = equipmentStateHistorySlice.actions;
export default equipmentStateHistorySlice.reducer;
