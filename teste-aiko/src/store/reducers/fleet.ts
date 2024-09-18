import { createSlice } from "@reduxjs/toolkit";
import Equipments from '../../data/equipment.json';
import { EquipmentInterface } from "../../interfaces/Equipment";

const initialState: EquipmentInterface[] = Equipments;

const fleetSlice = createSlice({
    name: 'fleet',
    initialState,
    reducers: {},      
  });

export default fleetSlice.reducer;