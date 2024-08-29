import { createSlice } from '@reduxjs/toolkit';

export const equipmentStateHistorySlice = createSlice({
    name: 'equipmentStateHistory',
    initialState: {
        data: [],
        filteredHistory: [],
    },
    reducers: {
        setEquipmentStateHistory: (state, action) => {
            state.data = action.payload;
        },
        setFilteredHistory: (state, action) => {
            state.filteredHistory = action.payload;
        },
    },
});

export const { setEquipmentStateHistory, setFilteredHistory } = equipmentStateHistorySlice.actions;
export default equipmentStateHistorySlice.reducer;