import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    equipments: [],
    positions: [],
    states: [],
    stateHistory: [],
};

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        setEquipments(state, action) {
            state.equipments = action.payload;
        },
        setPositions(state, action) {
            state.positions = action.payload;
        },
        setStates(state, action) {
            state.states = action.payload;
        },
        setStateHistory(state, action) {
            state.stateHistory = action.payload;
        },
    },
});

export const { setEquipments, setPositions, setStates, setStateHistory } = equipmentSlice.actions;
export default equipmentSlice.reducer;