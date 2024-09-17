import dataService from "./dataService"
export default {
    async createdEquipment(id) {
        try {
            const equipment = {}

            const equipmentData = await dataService.fetchEquipment()
            const equipmentModelData = await dataService.fetchEquipmentModel()
            const equipmentStates = await dataService.fetchEquipmentState()

            const foundEquipment = equipmentData.find(eq => eq.id === id)
            const foundModel = equipmentModelData.find(reg => reg.id === foundEquipment.equipmentModelId)
            
            if (foundEquipment) {
                equipment.id = foundEquipment.id,
                equipment.equipmentModelId = foundEquipment.equipmentModelId,
                equipment.name = foundEquipment.name
            } else {
                console.error(`Equipamento com id ${id} não encontrado em tabela de equipamentos`)
            }
            if (foundModel) {
                equipment.nameModel = foundModel.name

                equipment.hourlyEarnings = foundModel.hourlyEarnings.map(he =>{

                    const stateInfo = equipmentStates.find(state => state.id === he.equipmentStateId)
                    
                    return {
                        equipmentStateId: stateInfo ? stateInfo.name : 'Desconhecido',
                        stateName: stateInfo ? stateInfo.name : 'Desconhecido',
                        stateColor: stateInfo ? stateInfo.color : '#000000',
                        value: he.value
                    }
                })
            } else {
                console.error(`Erro ao carregar o equipamento:${foundEquipment.equipmentModelId}`)
            }
            return equipment
        } catch (error) {
            console.error(`Erro ao carregar o equipamento:${id}`, error)
            return null
        }   
    },
    async setEquipmentStates(id) {
        try {
            //equipmentId-states[], states[data, idState]
            const equipmentStateHistory = await dataService.fetchEquipmentStateHistory()
            //id, equipmentModelId, name
            const equip = this.createdEquipment(id)
            //id name color
            const equipmentStates = await dataService.fetchEquipmentState()
            const filteredHistory = equipmentStateHistory.find(reg => reg.equipmentId === id)
            if (filteredHistory && filteredHistory.states && filteredHistory.states.length > 0) {
                equip.states = filteredHistory.states.map(st => {
                    const stateInfo = equipmentStates.find(state => state.id === st.equipmentStateId)
                    return {
                        date: st.date,
                        equipmentStateId: st.equipmentStateId,
                        name: stateInfo ? stateInfo.name : 'Desconhecido',
                        color: stateInfo ? stateInfo.color : '#000000'
                    }
                })
            } else {
                equip.states = []
            }
            return equip
        } catch(error) {
            console.error(`Erro ao carregar o histórico de estado do equipamento:${id}`, error)
        }
    },
    
    async getCurrentState(id) {
        
        const historyData = await dataService.fetchEquipmentStateHistory()
        const hist = historyData.find(reg=> reg.equipmentId === id)
        const states = hist.states
        if (states.length > 0) {
            const mostRecentState = states.reduce((latest, current) => {
                return new Date(current.date) > new Date(latest.date) ? current : latest
            })
            const equipmentStates = await dataService.fetchEquipmentState()
            const state = equipmentStates .find(reg => reg.id === mostRecentState.equipmentStateId)
            return state ? state.name : 'Desconhecido';
        }
        return 'Desconhecido'
    },

    async getHistoryStates(id) {
        try {
            const historyData = await dataService.fetchEquipmentStateHistory()
            const equipmentState = await dataService.fetchEquipmentState()
            const hist = historyData.find(reg=> reg.equipmentId === id)
            if (!hist) {
                console.error(`Histórico não encontrado para o equipamento com id ${id}`)
                return [];
            }
            const states = hist.states
            states.sort((a, b) => new Date(b.date) - new Date(a.date));

            const enrichedStates = states.map(st=> {
                const stateInfo = equipmentState.find(state => state.id === st.equipmentStateId)
                return {
                    ...st,
                    name: stateInfo ? stateInfo.name : 'Desconhecido',
                    color: stateInfo ? stateInfo.color : '#000000'
                }
            })
            return enrichedStates
    } catch (error) {
        console.error(`Erro ao carregar o histórico de estados para o equipamento ${id}`, error);
    }
}
}