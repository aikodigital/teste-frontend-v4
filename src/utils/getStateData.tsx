import equipmentStateData from '../../data/equipmentState.json'

export function getStateData(id: string){
    const stateData = equipmentStateData.filter(state => state.id === id);
    return stateData[0];
}