import { createSlice } from "@reduxjs/toolkit";
import Equipments from '../../data/equipment.json';
import { Equipment } from "../../interfaces/Equipment";

const initialState: Equipment[] = Equipments;

const fleetSlice = createSlice({
    name: 'fleet',
    initialState,
    reducers: {
       
    }        
  });

  export const {  } = fleetSlice.actions;
  export default fleetSlice.reducer;