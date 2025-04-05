import { createSlice } from '@reduxjs/toolkit';
import {
  EquipmentPositionHistory,
  Position,
} from '~/types/equipment-position-history.types';
import { formatDate } from '~/utils/format-date';

interface EquipmentPositionHistoryState {
  data: EquipmentPositionHistory[];
}

const initial: EquipmentPositionHistoryState = {
  data: [],
};

const equipmentPositionHistorySlice = createSlice({
  name: 'equipment-position-history',
  initialState: initial,
  reducers: {
    setEquipmentPositionHistory: (state, action) => {
      state.data = action.payload.map((item: EquipmentPositionHistory) => ({
        ...item,
        positions: item.positions
          .map((state: Position) => ({
            ...state,
            date: formatDate(state.date),
          }))
          .sort(
            (a: Position, b: Position) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
      }));
    },
  },
});

export const { setEquipmentPositionHistory } =
  equipmentPositionHistorySlice.actions;
export default equipmentPositionHistorySlice.reducer;
