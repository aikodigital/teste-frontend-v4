import { createSlice } from '@reduxjs/toolkit';

export const equipmentPositionHistorySlice = createSlice({
    name: 'equipmentPositionHistory',
    initialState: {
        data: [],
    },
    reducers: {
        setEquipmentPositionHistory: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setEquipmentPositionHistory } = equipmentPositionHistorySlice.actions;
export default equipmentPositionHistorySlice.reducer;
