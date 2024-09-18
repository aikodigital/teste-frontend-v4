import { createSlice } from "@reduxjs/toolkit";
import PositionsHistory from '../../data/equipmentPositionHistory.json';
import StateHistory from '../../data/equipmentStateHistory.json';
import EquipmentStates from '../../data/equipmentState.json';
import { MapEquipmentInterface } from "../../interfaces/MapEquipment";
import { EquipmentStateInterface } from "../../interfaces/EquipmentState";

const getData = () => {
  const states: EquipmentStateInterface[] = EquipmentStates;
  let equipments: MapEquipmentInterface[] = [];
  PositionsHistory.forEach(item => {
    equipments.push({
        equipmentId: item.equipmentId,
        lastPosition: [item.positions[item.positions.length - 1].lat, item.positions[item.positions.length - 1].lon],
        currentState: ''
      })
    });
    StateHistory.forEach((item) => {
      const currentEquip = equipments.find(equip => equip.equipmentId === item.equipmentId);
      const currentStateId = item.states[item.states.length - 1].equipmentStateId;
      const latestState = states.find(state => state.id === currentStateId);
      if(!currentEquip || !latestState) {
        return
      } else {
        currentEquip.currentState = latestState?.name;
      }
    })
    return equipments;
}

const initialState: MapEquipmentInterface[] = getData();

const mapEquipmentsSlice = createSlice({
    name: 'mapEquipment',
    initialState,
    reducers: {
       
    }        
  });

export default mapEquipmentsSlice.reducer;