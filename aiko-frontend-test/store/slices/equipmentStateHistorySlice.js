import { createSlice } from '@reduxjs/toolkit';

export const equipmentStateHistorySlice = createSlice({
    name: 'equipmentStateHistory',
    initialState: {
        data: [],
        filteredHistory: [],
        filteredStateModel: null
    },
    reducers: {
        setEquipmentStateHistory: (state, action) => {
            state.data = action.payload;
        },
        setFilteredHistory: (state, action) => {
            state.filteredHistory = action.payload;
        },

        setFilteredStateModel: (state, action) => {
            state.filteredStateModel = action.payload;
        },
    },
});

export const { setEquipmentStateHistory, setFilteredHistory, setFilteredStateModel } = equipmentStateHistorySlice.actions;
export default equipmentStateHistorySlice.reducer;