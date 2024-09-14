import { createSlice } from "@reduxjs/toolkit";

import equipmentModel from '../../data/equipmentModel.json'
import equipment from '../../data/equipment.json'
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json'
import equipmentState from '../../data/equipmentState.json'
import equipmentStateHistory from '../../data/equipmentStateHistory.json'


// agrega as infos de cada equipamento em um array so 
// nome, modelo, ultima localizacao, ultimo estado

const markers = []

equipment.forEach(item => {

    //armazena na variavel model o nome do modelo do equipamento
    const modelo = equipmentModel.filter((x) => item.equipmentModelId === x.id)[0].name

    //armazena na variavel lastPos a ultima localizacao do equipamento
    const posHistory = equipmentPositionHistory.filter((x) => item.id === x.equipmentId)[0].positions
    const lastPos = posHistory[posHistory.length -1]

    //armazena na variavel stateHistory o ultimo estado do equipamento
    const stateHistory = equipmentStateHistory.filter((x) => item.id === x.equipmentId)[0].states
    const lastStateId = stateHistory[stateHistory.length -1].equipmentStateId
    const lastState = equipmentState.filter((x) => lastStateId === x.id)[0]

    const equipmentMarkers = {...item, model:modelo, lastPos, lastState}

    markers.push(equipmentMarkers)

    
});


const initialState = markers;

const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {

  }
});


export default equipmentSlice.reducer;