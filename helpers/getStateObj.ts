import EquipmentState from '../data/equipmentState.json';

export function getStateObj(stateId: string | undefined) {
  console.log('pra filtrar o nome: ', stateId);
  const stateNameObj = EquipmentState.filter((equipmentStateObj) => {
    if (equipmentStateObj.id === stateId) return equipmentStateObj;
  });
  return stateNameObj[0];
}
