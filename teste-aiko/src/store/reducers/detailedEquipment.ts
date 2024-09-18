import { createSlice } from "@reduxjs/toolkit";
import PositionsHistory from '../../data/equipmentPositionHistory.json';
import StateHistory from '../../data/equipmentStateHistory.json';
import EquipmentStates from '../../data/equipmentState.json';
import { EquipmentStateInterface } from "../../interfaces/EquipmentState";
import { DetailedEquipmentInterface } from "../../interfaces/DetailedEquipment";
import truckImg from '../../assets/box-truck.png';

const getData = () => {
  const states: EquipmentStateInterface[] = EquipmentStates;
  let equipments: DetailedEquipmentInterface[] = [];
  PositionsHistory.forEach(item => {
    equipments.push({
        equipmentId: item.equipmentId,
        latestPosition: [item.positions[item.positions.length - 1].lat, item.positions[item.positions.length - 1].lon],
        currentState: '',
        stateHistory: [],
        imgUrl: truckImg
      })
    });
    StateHistory.forEach((item) => {
      const currentEquip = equipments.find(equip => equip.equipmentId === item.equipmentId);
      const currentStateId = item.states[item.states.length - 1].equipmentStateId;
      const latestState = states.find(state => state.id === currentStateId);
      if(!currentEquip || !latestState) {
        return
      } else {
        currentEquip.currentState = latestState.name;
        currentEquip.stateHistory = item.states;
      }
    })
    return equipments;
}

const initialState: DetailedEquipmentInterface[] = getData();

const detailedEquipmentsSlice = createSlice({
    name: 'detailedEquipment',
    initialState,
    reducers: {
       
    }        
  });

export default detailedEquipmentsSlice.reducer;