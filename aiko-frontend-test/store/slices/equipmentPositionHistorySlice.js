import { createSlice } from '@reduxjs/toolkit';

export const equipmentPositionHistorySlice = createSlice({
    name: 'equipmentPositionHistory',
    initialState: {
        data: [],
        equipmentLatestHistory: [],
    },
    reducers: {
        setEquipmentPositionHistory: (state, action) => {
            state.data = action.payload;
        },
        setEquipmentLatestHistory: (state, action) => {
            state.equipmentLatestHistory = action.payload;
        }
    },
});

export const { setEquipmentPositionHistory, setEquipmentLatestHistory } = equipmentPositionHistorySlice.actions;
export default equipmentPositionHistorySlice.reducer;
