import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './equipmentSlice';
import mapReducer from './mapSlice';

export const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;