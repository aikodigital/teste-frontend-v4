import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './equipmentSlice';

export const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
  },
});
