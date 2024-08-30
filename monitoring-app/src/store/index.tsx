import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './equipmentSlice';

const store = configureStore({
    reducer: {
        equipment: equipmentReducer,
    },
});

export const rootReducer = combineReducers({
    equipment: equipmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;





