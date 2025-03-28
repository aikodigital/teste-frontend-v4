// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './equipmentReducer';
import historyReducer from './historyReducer';

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
