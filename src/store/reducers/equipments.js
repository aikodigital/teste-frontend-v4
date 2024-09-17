import { createSlice } from "@reduxjs/toolkit";

import equipmentModel from '../../data/equipmentModel.json'
import equipment from '../../data/equipment.json'
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json'
import equipmentState from '../../data/equipmentState.json'
import equipmentStateHistory from '../../data/equipmentStateHistory.json'




//funcao que formata as datas dos jsons
const formatDate = (dateString) => {
    const date = new Date(dateString)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); //meses comecam no 0
    const year = date.getFullYear().toString().slice(-2)

    const hrs = date.getHours().toString().padStart(2, '0')
    const min = date.getMinutes().toString().padStart(2, '0')

    return `${day}/${month}/${year}, ${hrs}:${min}h`

}

// agrega as infos de cada equipamento em um array so 
const equipments = {
    filtered:[],
    unfiltered:[],
    focus: {
        latitude: -19.151801,
        longitude: -46.007759,
        zoom: 10,
    },
    filters: {
        status: 'Todos',
        model: 'Todos',
        search:''
    }
}

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

    equipments.unfiltered.push(compiledEquipments)

});

equipments.filtered = equipments.unfiltered

const initialState = equipments;

const equipmentSlice = createSlice({
    name: 'equipments',
    initialState,
    reducers: {

        filterStatus: (state, action) => {

            //atualiza o criterio do filtro armazenado no estado
            state.filters.status = action.payload;

            // Aplica todos os filtros presentes no estado
            state.filtered = state.unfiltered.filter(item =>

                //compara o termo de busca armazenado no estado com o nome dos equipamentos
                (item.name.toLowerCase().includes(state.filters.search.toLowerCase())) &&

                // verifica se o filtro engloba todos os itens, OU se existe alguma correspondencia ao filtro de status
                (state.filters.status === 'Todos' || item.lastState.name === state.filters.status) &&

                //o mesmo da linha de cima, porem verifica correspondencia ao filtro de modelo
                (state.filters.model === 'Todos' || item.model === state.filters.model)
            );
        },

        filterModel: (state, action) => {

            //atualiza o criterio do filtro armazenado no estado
            state.filters.model = action.payload;

            state.filtered = state.unfiltered.filter(item =>

                (item.name.toLowerCase().includes(state.filters.search.toLowerCase())) &&
                (state.filters.status === 'Todos' || item.lastState.name === state.filters.status) &&
                (state.filters.model === 'Todos' || item.model === state.filters.model)
            );
        },

        filterSearch: (state, action) => {

            //atualiza o criterio do filtro armazenado no estado
            state.filters.search = action.payload;

            state.filtered = state.unfiltered.filter(item =>
                
                (state.filters.status === 'Todos' || item.lastState.name === state.filters.status) &&
                (state.filters.model === 'Todos' || item.model === state.filters.model) &&
                (item.name.toLowerCase().includes(state.filters.search.toLowerCase())) 
            );
        },

        focusEquipment: (state, action) => {
            const selectedEquipment = state.unfiltered.find((x) => x.id === action.payload);
        
            if (selectedEquipment) {
                state.focus.latitude = selectedEquipment.lastPos.lat;
                state.focus.longitude = selectedEquipment.lastPos.lon;
                state.focus.zoom = 12
            }
        }

    }
});

// retorna o hisotrico de estados a partir de um id da payload

export const { filterStatus, filterModel, filterSearch, focusEquipment } = equipmentSlice.actions
export default equipmentSlice.reducer;