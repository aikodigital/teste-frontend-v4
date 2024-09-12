import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface EquipmentPosition {
  equipmentId: string;
  positions: Array<{ lat: number; lon: number; date: string }>;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: Array<{ date: string; equipmentStateId: string }>;
}

// Estado inicial
interface EquipmentState {
  equipments: Equipment[];
  positions: EquipmentPosition[];
  states: EquipmentState[];
  stateHistory: EquipmentStateHistory[];
  loading: boolean;
  error: string | null;
}

const initialState: EquipmentState = {
  equipments: [],
  positions: [],
  states: [],
  stateHistory: [],
  loading: false,
  error: null,
  id: "",
  name: "",
  color: ""
};

// Carregar dados
export const fetchEquipmentData = createAsyncThunk(
  "equipment/fetchData",
  async () => {
    const equipment = await axios.get("/data/equipment.json");
    const positions = await axios.get("/data/equipmentPositionHistory.json");
    const states = await axios.get("/data/equipmentState.json");
    const stateHistory = await axios.get("/data/equipmentStateHistory.json");

    return {
      equipment: equipment.data,
      positions: positions.data,
      states: states.data,
      stateHistory: stateHistory.data,
    };
  }
);

const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipmentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEquipmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.equipments = action.payload.equipment;
        state.positions = action.payload.positions;
        state.states = action.payload.states;
        state.stateHistory = action.payload.stateHistory;
      })
      .addCase(fetchEquipmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading data";
      });
  },
});

export default equipmentSlice.reducer;
