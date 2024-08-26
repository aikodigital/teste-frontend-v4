import { createSlice } from '@reduxjs/toolkit';

export const equipmentStateHistorySlice = createSlice({
    name: 'equipmentStateHistory',
    initialState: {
        data: [],
    },
    reducers: {
        setEquipmentStateHistory: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setEquipmentStateHistory } = equipmentStateHistorySlice.actions;
export default equipmentStateHistorySlice.reducer;