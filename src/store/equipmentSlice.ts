import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from '../services/EquipmentStateService/IEquipmentStateService';
import { fetchEquipments, fetchModels, fetchStates } from './equipmentThunks';
import { IModelData } from '../services/ModelService/IModelService';
import { IStateData } from '../services/StateService/IStateService';
import { IPosition } from '../services/EquipmentPositionService/IPositionService';

export interface IEquipmentStore {
  equipmentId: string;
  currentState: IState | null;
  currentPosition: IPosition | null;
  equipmentModel: string | null;
  name: string;
}
interface EquipmentStoreState {
  equipments: IEquipmentStore[];
  models: IModelData[];
  states: IStateData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EquipmentStoreState = {
  equipments: [],
  models: [],
  states: [],
  status: 'idle',
  error: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchEquipments
    builder
      .addCase(fetchEquipments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchEquipments.fulfilled,
        (state, action: PayloadAction<IEquipmentStore[]>) => {
          state.status = 'succeeded';
          state.equipments = action.payload;
        }
      )
      .addCase(fetchEquipments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch equipment data';
      });

    // Handle fetchModels
    builder
      .addCase(fetchModels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchModels.fulfilled,
        (state, action: PayloadAction<IModelData[]>) => {
          state.status = 'succeeded';
          state.models = action.payload;
        }
      )
      .addCase(fetchModels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch models';
      });

    // Handle fetchStates
    builder
      .addCase(fetchStates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchStates.fulfilled,
        (state, action: PayloadAction<IStateData[]>) => {
          state.status = 'succeeded';
          state.states = action.payload;
        }
      )
      .addCase(fetchStates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch states';
      });
  },
});

export default equipmentSlice.reducer;
