import { combineReducers, configureStore } from '@reduxjs/toolkit';
import equipmentsReducer from './reducers/equipment.reducer';
import equipmentModelReducer from './reducers/equipment-model.reducer';
import equipmentStateReducer from './reducers/equipment-state.reducer';
import equipmentStateHistoryReducer from './reducers/equipment-state-history.reducer';
import equipmentPositionHistoryReducer from './reducers/equipment-position-history.reducer';

export const reducers = combineReducers({
  equipments: equipmentsReducer,
  model: equipmentModelReducer,
  state: equipmentStateReducer,
  stateHistory: equipmentStateHistoryReducer,
  position: equipmentPositionHistoryReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type ReduxState = ReturnType<typeof store.getState>;
