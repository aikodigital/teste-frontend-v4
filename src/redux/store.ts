import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './slices/equipmentSlice';

export const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
