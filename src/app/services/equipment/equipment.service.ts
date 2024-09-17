import { Injectable } from '@angular/core';
import equipments from '../../../assets/data/equipment.json'
import models from '../../../assets/data/equipmentModel.json'
import state from '../../../assets/data/equipmentState.json'
import positionHistory from '../../../assets/data/equipmentPositionHistory.json'
import stateHistory from '../../../assets/data/equipmentStateHistory.json'

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

interface Model {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: string;
  };
}

interface PositionHistory {
  equipmentId: string,
  positions: Position[]
}

interface StateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface State {
  id: string;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor() { }

  getEquipmentsData() {
    return equipments;
  }

  getModelsData() {
    return models;
  }

  getStatesData() {
    return state;
  }

  getStateHistoryData() {
    return stateHistory;
  }

  getPositionsHistoryData() {
    return positionHistory;
  }

  getEquipmentInfo(equipmentId: string, equipments: Equipment[]): Equipment | undefined {
    return equipments.find((equip: Equipment) => equip.id === equipmentId);
  }

  getModelInfo(equipmentId: string, equipments: Equipment[], models: Model[]): Model | undefined {
    const equipment = equipments.find((equip: Equipment) => equip.id === equipmentId);
    return models.find((model: Model) => model.id === equipment!.equipmentModelId);
  }

  getLatestPosition(positions: Position[]): Position | undefined {
    if (!positions || positions.length === 0) {
      return undefined;
    }
    return positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  }

  getLatestStateInfo(equipmentId: string, stateHistory: StateHistory[], state: State[]): State | undefined {
    const equipmentState = stateHistory.find((state: StateHistory) => state.equipmentId === equipmentId);

    const latestState = equipmentState!.states.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return state.find((info: State) => info.id === latestState.equipmentStateId);
  }

  getStateInfoById(stateId: string) {
    return state.find((state: any) => state.id === stateId);
  }

  getStateHistoryByEquipmentId(equipmentId: string) {
    let states = stateHistory.find((state: StateHistory) => state.equipmentId === equipmentId);

    if (states) {
      states.states = states.states.map(item => {
        const stateInfo = this.getStateInfoById(item.equipmentStateId);
        return {
          ...item,
          stateInfo,
        };
      });
    }

    return states;
  }

  getPositionsHistoryByEquipmentId(equipmentId: string) {
    return positionHistory.find((pos: PositionHistory) => pos.equipmentId === equipmentId)
  }

  calculateEarnings(equipmentId: string) {
    const equipment = equipments.find((equip: Equipment) => equip.id === equipmentId);
    const equipModel = models.find((model: any) => model.id === equipment!.equipmentModelId);

    const hourlyEarnings = equipModel!.hourlyEarnings;

    const earningsMap = new Map<string, number>();
    hourlyEarnings.forEach(e => {
      earningsMap.set(e.equipmentStateId, e.value);
    });

    const equipmentStateHistory = this.getStateHistoryByEquipmentId(equipmentId);
    const sortedStates = equipmentStateHistory!.states.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let totalEarnings = 0;

    for (let i = 0; i < sortedStates.length - 1; i++) {
      const currentState = sortedStates[i];
      const nextState = sortedStates[i + 1];

      const currentDate = new Date(currentState.date).getTime();
      const nextDate = new Date(nextState.date).getTime();
      const durationHours = (nextDate - currentDate) / (1000 * 60 * 60);

      const valuePerHour = earningsMap.get(currentState.equipmentStateId) || 0;
      totalEarnings += valuePerHour * durationHours;
    }

    return totalEarnings;
  }

  calculateProductivity(equipmentId: string) {
    const equipmentStateHistory = this.getStateHistoryByEquipmentId(equipmentId);
    const sortedStates = equipmentStateHistory!.states.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) as any;

    let totalHours = 0;
    let workingHours = 0;

    for (let i = 0; i < sortedStates.length - 1; i++) {
      const currentState = sortedStates[i];
      const nextState = sortedStates[i + 1];

      const currentDate = new Date(currentState.date).getTime();
      const nextDate = new Date(nextState.date).getTime();
      const durationHours = (nextDate - currentDate) / (1000 * 60 * 60);

      if (currentState.stateInfo.name == 'Operando') {
        workingHours += durationHours;
      }
      totalHours += durationHours;
    }

    let productivity = workingHours / totalHours * 100;

    return productivity.toFixed(2);
  }
}