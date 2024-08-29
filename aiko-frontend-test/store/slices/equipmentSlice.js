import { createSlice } from '@reduxjs/toolkit';

export const equipmentSlice = createSlice({
    name: 'equipment',
    initialState: {
        data: [],
    },
    reducers: {
        setEquipment: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;