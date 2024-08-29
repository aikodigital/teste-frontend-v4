import { createSlice } from '@reduxjs/toolkit';

export const equipmentModelSlice = createSlice({
    name: 'equipmentModel',
    initialState: {
        data: [],
    },
    reducers: {
        setEquipmentModel: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setEquipmentModel } = equipmentModelSlice.actions;
export default equipmentModelSlice.reducer;