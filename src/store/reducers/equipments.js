import { createSlice } from "@reduxjs/toolkit";

import equipmentModel from '../../data/equipmentModel.json'
import equipment from '../../data/equipment.json'
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json'
import equipmentState from '../../data/equipmentState.json'
import equipmentStateHistory from '../../data/equipmentStateHistory.json'




//funcao que formata as datas dos jsons
const formatDate = (dateString) => {
    const date = new Date(dateString)

    const day = date.getDay().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); //meses comecam no 0
    const year = date.getFullYear().toString().slice(-2)

    const hrs = date.getHours().toString().padStart(2, '0')
    const min = date.getMinutes().toString().padStart(2, '0')

    return `${day}/${month}/${year}, ${hrs}:${min}h`

}

// agrega as infos de cada equipamento em um array so 
// nome, modelo, ultima localizacao, ultimo estado

const equipments = []

equipment.forEach(item => {

    //armazena na variavel model o nome do modelo do equipamento
    const modelo = equipmentModel.filter((x) => item.equipmentModelId === x.id)[0].name

    //remove o id de modelo do item
    const {equipmentModelId, ...tempItem} = item 

    //armazena na variavel lastPos a ultima localizacao do equipamento
    const posHistory = equipmentPositionHistory.filter((x) => item.id === x.equipmentId)[0].positions
    const lastPos = posHistory[posHistory.length -1]

    //armazena na variavel stateHistory o historico de estados do equipamento
    const stateHistory = equipmentStateHistory.filter((x) => item.id === x.equipmentId)[0].states

    //formata o historico de estados em strings legiveis
    const newStateHistory = []

    stateHistory.forEach(item =>{
        const newDate = formatDate(item.date)
        const newState = equipmentState.filter( (x) => item.equipmentStateId === x.id)[0]

        newStateHistory.push({date:newDate, state:newState})
    })



    const lastStateId = stateHistory[stateHistory.length -1].equipmentStateId
    const lastState = equipmentState.filter((x) => lastStateId === x.id)[0]

    // armazena na variavel equipmentMarkers o array de objetos compilados dos arquivos json
    const compiledEquipments = {...tempItem, model:modelo, posHistory, lastPos, lastState, newStateHistory}

    equipments.push(compiledEquipments)

    
});


const initialState = equipments;

const equipmentSlice = createSlice({
    name: 'equipments',
    initialState,
    reducers: {
        // focus: (state, action) => {
        //     state.filter(action.payload)
        // }

        stateHistory: (state, action) => {

            //separa o equipamento do estado com base no id
            const currentEquipment = state.filter( (eq) => action.payload === eq.id )


            return currentEquipment.stateHistory
        }

    }
});

// retorna o hisotrico de estados a partir de um id da payload

export const { stateHistory } = equipmentSlice.actions
export default equipmentSlice.reducer;