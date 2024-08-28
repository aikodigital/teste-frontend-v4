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

const equipment = equipmentJson as Array<Equipment>;
const equipmentState = equipmentStateJson as Array<EquipmentState>;
const equipmentModels = equipmentModelJson as Array<EquipmentModel>;
const equipmentPositionHistories = equipmentPositionHistoryJson as Array<EquipmentPositionHistory>;
const equipmentStateHistories = equipmentStateHistoryJson as Array<EquipmentStateHistory>;

export function getEquipmentsWithModelAndState(): EquipmentWithModelAndState[] {
  return equipment.map(equip => {
    const model = equipmentModels.find(model => model.id === equip.equipmentModelId);
    const stateHistory = equipmentStateHistories.find(history => history.equipmentId === equip.id);
    const currentStateId = stateHistory?.states.slice(-1)[0]?.equipmentStateId;
    const currentState = equipmentState.find(state => state.id === currentStateId);

    return {
      equipment: equip,
      modelName: model?.name || 'Modelo desconhecido',
      currentState: currentState,
    };
  });
}

export function getEquipmentPositionHistory(equipmentId: string): EquipmentPositionHistory | undefined {
  return equipmentPositionHistories.find(history => history.equipmentId === equipmentId);
}

export function getEquipmentStateHistory(equipmentId: string): EquipmentStateHistory | undefined {
  return equipmentStateHistories.find(history => history.equipmentId === equipmentId);
}

export function getEquipmentsByState(stateId: string): Equipment[] {
  const state = equipmentState.find(s => s.id === stateId);
  if (!state) return [];

  const stateHistories = equipmentStateHistories.filter(history =>
    history.states.some(entry => entry.equipmentStateId === state.id)
  );

  return stateHistories.map(history => {
    const equip = equipment.find(e => e.id === history.equipmentId);
    return equip || { id: '', name: 'Equipamento desconhecido', equipmentModelId: '' };
  });
}

export function getModelsByStateEarnings(stateId: string): EquipmentModel[] {
  const state = equipmentState.find(s => s.id === stateId);
  if (!state) return [];

  return equipmentModels.filter(model =>
    model.hourlyEarnings.some(entry => entry.equipmentStateId === state.id)
  );
}

export function calculateModelEarnings(): ModelEarnings[] {
  return equipmentModels.map(model => {
    const totalEarnings = model.hourlyEarnings.reduce((total, entry) => {
      const state = equipmentState.find(state => state.id === entry.equipmentStateId);

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
