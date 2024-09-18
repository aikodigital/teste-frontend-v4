import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import equipmentReducer from './equipmentSlice';

export const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
