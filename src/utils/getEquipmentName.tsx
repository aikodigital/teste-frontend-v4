import equipmentData from '../../data/equipment.json';

export function getEquipmentName(id: string){
    const [equipment] = equipmentData.filter(equipment => equipment.id === id)
    return equipment.name;
}