import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import equipmentData from '../data/equipment.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentModel from '../data/equipmentModel.json';
import {
  Equipment,
  EquipmentStateSlice,
  EquipmentPositionHistory,
  EquipmentState,
} from '../types/interfaces';

const initialState: EquipmentStateSlice = {
  equipments: [],
  history: {},
  model: {},
  loading: false,
  error: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    fetchEquipmentsStart: (state) => {
      state.loading = true;
    },
    fetchEquipmentsSuccess: (state, action: PayloadAction<Equipment[]>) => {
      state.equipments = action.payload;
      state.loading = false;
    },
    fetchEquipmentsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchStateHistory: (state, action: PayloadAction<string>) => {
      const filteredHistory = equipmentStateHistory.find(
        (item) => item.equipmentId === action.payload
      );
      if (filteredHistory) {
        const newState = {
          equipmentId: filteredHistory.equipmentId,
          states: filteredHistory.states.map((state) => ({
            date: state.date,
            equipmentId: state.equipmentStateId,
            color: equipmentState.find(
              (item) => item.id === state.equipmentStateId
            )?.color,
            name: equipmentState.find(
              (item) => item.id === state.equipmentStateId
            )?.name,
          })),
        };
        state.history = newState;
      }
    },
    fetchStateHistoryClose: (state) => {
      state.history = {};
    },
    fetchingModel: (state, action: PayloadAction<string>) => {
      const modelSelect = equipmentModel.find(
        (item) => item.id === action.payload
      );
      state.model = {
        modelId: modelSelect?.id,
        name: modelSelect?.name,
        hourlyEarnings: modelSelect?.hourlyEarnings,
      };
    },
    updateEquipmentPosition: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<{ equipmentId: string; position: any }>
    ) => {
      const equipment = state.equipments.find(
        (eq) => eq.equipmentId === action.payload.equipmentId
      );
      if (equipment) {
        equipment.latestPosition = action.payload.position;
      }
    },
    updateEquipmentState: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<{ equipmentId: string; state: any }>
    ) => {
      const equipment = state.equipments.find(
        (eq) => eq.equipmentId === action.payload.equipmentId
      );
      if (equipment) {
        equipment.latestState = action.payload.state;
      }
    },
    updateStateDescription: (state, action) => {
      const equipment = state.equipments.find(
        (eq) => eq.equipmentId === action.payload.equipmentId
      );
      if (equipment) {
        equipment.latestState = {
          name: action.payload.name,
          color: action.payload.color,
          date: action.payload.date ?? equipment.latestState?.date,
          equipmentStateId:
            action.payload.equipmentStateId ??
            equipment.latestState?.equipmentStateId,
        };
      }
    },
  },
});

export const {
  fetchEquipmentsStart,
  fetchEquipmentsSuccess,
  fetchEquipmentsFailure,
  updateEquipmentPosition,
  updateEquipmentState,
  updateStateDescription,
  fetchStateHistory,
  fetchStateHistoryClose,
  fetchingModel,
} = equipmentSlice.actions;

export const fetchEquipments = (): AppThunk => async (dispatch) => {
  dispatch(fetchEquipmentsStart());
  try {
    const equipments = (equipmentData as EquipmentState[]).map((equipment) => ({
      equipmentId: equipment.id,
      name: equipment.name,
      modelId: equipment.equipmentModelId,
    }));
    dispatch(fetchEquipmentsSuccess(equipments));
    equipments.forEach((equipment) => {
      const positionHistory = (
        equipmentPositionHistory as EquipmentPositionHistory[]
      ).find((eq) => eq.equipmentId === equipment.equipmentId);
      const latestPosition = positionHistory?.positions.reduce(
        (latest, current) => {
          return new Date(current.date) > new Date(latest.date)
            ? current
            : latest;
        },
        positionHistory.positions[0]
      );
      dispatch(
        updateEquipmentPosition({
          equipmentId: equipment.equipmentId,
          position: latestPosition,
        })
      );

      const stateHistory = equipmentStateHistory.find(
        (item) => item.equipmentId === equipment.equipmentId
      );

      const latestState = stateHistory?.states.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date)
          ? current
          : latest;
      }, stateHistory.states[0]);
      dispatch(
        updateEquipmentState({
          equipmentId: equipment.equipmentId,
          state: latestState,
        })
      );

      const stateDescription = equipmentState.find(
        (state) => state.id === latestState?.equipmentStateId
      );
      dispatch(
        updateStateDescription({
          equipmentId: equipment.equipmentId,
          name: stateDescription?.name,
          color: stateDescription?.color,
        })
      );
    });
  } catch (err) {
    dispatch(fetchEquipmentsFailure((err as Error).message));
  }
};

export const fetchEquipmentHistory =
  (id?: string): AppThunk =>
  (dispatch) => {
    try {
      if (id) {
        dispatch(fetchStateHistory(id));
      } else {
        dispatch(fetchStateHistoryClose());
      }
    } catch (err) {
      console.error(err);
    }
  };

export const fetchModel =
  (modelId?: string): AppThunk =>
  (dispatch) => {
    try {
      if (modelId) {
        dispatch(fetchingModel(modelId));
      }
    } catch (err) {
      console.error(err);
    }
  };

export default equipmentSlice.reducer;
