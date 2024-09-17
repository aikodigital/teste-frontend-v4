export function lastEquipmentState(equipment: Equipment) {
    const equipmentWithLastState = equipment.states.slice(-1);
  
    return equipmentWithLastState;
  }