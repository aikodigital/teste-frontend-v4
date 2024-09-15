import { Injectable } from '@angular/core';

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
}