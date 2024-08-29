import equipmentJson from '../../data/equipment.json';
import equipmentModelJson from '../../data/equipmentModel.json';
import equipmentPositionHistoryJson from '../../data/equipmentPositionHistory.json';
import equipmentStateJson from '../../data/equipmentState.json';
import equipmentStateHistoryJson from '../../data/equipmentStateHistory.json';
import {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentState,
  EquipmentStateHistory
} from '../interfaces/models.interface';


interface EquipmentWithModelAndState {
  equipment: Equipment;
  modelName: string;
  currentState: EquipmentState | undefined;
}
interface ModelEarnings {
  modelName: string;
  totalEarnings: number;
}

const equipmentData = equipmentJson as Array<Equipment>;
const equipmentStateData = equipmentStateJson as Array<EquipmentState>;
const equipmentModelsData = equipmentModelJson as Array<EquipmentModel>;
const equipmentPositionHistoriesData = equipmentPositionHistoryJson as Array<EquipmentPositionHistory>;
const equipmentStateHistoriesData = equipmentStateHistoryJson as Array<EquipmentStateHistory>;

export function getEquipmentsWithModelAndState(): EquipmentWithModelAndState[] {
  return equipmentData.map(equip => {
    const model = equipmentModelsData.find(model => model.id === equip.equipmentModelId);
    const stateHistory = equipmentStateHistoriesData.find(history => history.equipmentId === equip.id);
    const currentStateId = stateHistory?.states.slice(-1)[0]?.equipmentStateId;
    const currentState = equipmentStateData.find(state => state.id === currentStateId);

    return {
      equipment: equip,
      modelName: model?.name || 'Modelo desconhecido',
      currentState: currentState,
    };
  });
}

export function getEquipmentPositionHistory(equipmentId: string) {
  const history = equipmentPositionHistoriesData.find(history => history.equipmentId === equipmentId);
  const equipment = equipmentData.find(item => item.id === equipmentId);

  return {
    history,
    equipment
  }
}

export function getEquipmentStateHistory(equipmentId: string) {
  const lists = [];
  let equipmentStateHistory = equipmentStateHistoriesData.find(history => history.equipmentId === equipmentId)?.states;

  equipmentStateHistory?.forEach(item => {
    const state = equipmentStateData.find(value => value.id === item.equipmentStateId);

    return lists.push({
      date: item.date,
      state: state
    });
  });

  return lists;
}

export function getEquipmentsByState(stateId: string): Equipment[] {
  const state = equipmentStateData.find(s => s.id === stateId);
  if (!state) return [];

  const stateHistories = equipmentStateHistoriesData.filter(history =>
    history.states.some(entry => entry.equipmentStateId === state.id)
  );

  return stateHistories.map(history => {
    const equip = equipmentData.find(e => e.id === history.equipmentId);
    return equip || { id: '', name: 'Equipamento desconhecido', equipmentModelId: '' };
  });
}

export function getModelsByStateEarnings(stateId: string): EquipmentModel[] {
  const state = equipmentStateData.find(s => s.id === stateId);
  if (!state) return [];

  return equipmentModelsData.filter(model =>
    model.hourlyEarnings.some(entry => entry.equipmentStateId === state.id)
  );
}

export function calculateModelEarnings(): ModelEarnings[] {
  return equipmentModelsData.map(model => {
    const totalEarnings = model.hourlyEarnings.reduce((total, entry) => {
      const state = equipmentStateData.find(state => state.id === entry.equipmentStateId);

      if (state) {
        return total + entry.value;
      }

      return total;
    }, 0);

    return {
      modelName: model.name,
      totalEarnings,
    };
  });
}
