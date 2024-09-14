import equipmentPositionHistoryData from '../../data/equipmentPositionHistory.json' 

export function getEquipmentPositionHistory(Id: string){

    const [equipmentPositionHistory] = equipmentPositionHistoryData.filter(equipment => equipment.equipmentId === Id) 

    const sortedEquipment = [...equipmentPositionHistory.positions].sort((a, b) => {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });

    return sortedEquipment.slice(0, 10);

}