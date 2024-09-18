import { createAsyncThunk } from '@reduxjs/toolkit';
import { EquipmentService } from '../services/EquipmentService/EquipmentService';
import { ModelService } from '../services/ModelService/ModelService';
import { StateService } from '../services/StateService/StateService';
import { EquipmentStateService } from '../services/EquipmentStateService/EquipmentStateService';
import { EquipmentPositionService } from '../services/EquipmentPositionService/PositionService';
import { IEquipmentStore } from './equipmentSlice';

export const fetchEquipments = createAsyncThunk(
  'equipment/fetchEquipments',
  async (_, { rejectWithValue }) => {
    try {
      const equipmentService = new EquipmentService();
      const equipmentStateService = new EquipmentStateService();
      const positionService = new EquipmentPositionService();

      const equipments = await equipmentService.fetchAllEquipmentData();
      const equipmentStates =
        await equipmentStateService.fetchAllEquipmentState();
      const positions = await positionService.fetchAllEquipmentsPositions();

      // Normalize and combine equipment states and positions into a unified structure
      const equipmentData: IEquipmentStore[] = equipments.map((equipment) => {
        const currentPosition = positions.find(
          (pos) => pos.equipmentId === equipment.id
        );
        const currentState = equipmentStates.find(
          (equipmentState) => equipmentState.equipmentId === equipment.id
        );
        return {
          name: equipment.name,
          equipmentId: equipment.id,
          currentState: currentState ? currentState.state : null,
          currentPosition: currentPosition ? currentPosition.position : null,
          equipmentModel: equipment.equipmentModelId,
        };
      });

      return equipmentData;
    } catch (error) {
      console.error('Erro ao criar store de tipos de serviço', error);
      return rejectWithValue('Failed to fetch equipment data');
    }
  }
);

export const fetchModels = createAsyncThunk(
  'equipment/fetchModels',
  async (_, { rejectWithValue }) => {
    try {
      const modelService = new ModelService();
      return await modelService.fetchAllModels();
    } catch (error) {
      console.error('Erro ao criar store de tipos de serviço', error);
      return rejectWithValue('Failed to fetch models');
    }
  }
);

export const fetchStates = createAsyncThunk(
  'equipment/fetchStates',
  async (_, { rejectWithValue }) => {
    try {
      const stateService = new StateService();
      return await stateService.fetchAllStates();
    } catch (error) {
      console.error('Erro ao criar store de tipos de estados', error);
      return rejectWithValue('Failed to fetch states');
    }
  }
);
