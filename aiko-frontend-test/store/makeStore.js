import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import equipmentReducer from './slices/equipmentSlice';
import equipmentModelReducer from './slices/equipmentModelSlice';
import equipmentPositionHistoryReducer from './slices/equipmentPositionHistorySlice';
import equipmentStateReducer from './slices/equipmentStateSlice';
import equipmentStateHistoryReducer from './slices/equipmentStateHistorySlice';

const makeStore = () =>
    configureStore({
        reducer: {
            equipment: equipmentReducer,
            equipmentModel: equipmentModelReducer,
            equipmentPositionHistory: equipmentPositionHistoryReducer,
            equipmentState: equipmentStateReducer,
            equipmentStateHistory: equipmentStateHistoryReducer,
        },
    });

export const store = makeStore();
export const wrapper = createWrapper(makeStore);
