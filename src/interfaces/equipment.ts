import { IHourlyEarnings } from './equipmentModel';
import { IPositions } from './equipmentPositionHistory';
import { IStates } from './equipmentStateHistory';

export interface IEquipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

export interface IEquipmentDetail {
  id: string;
  equipmentModelId: string;
  name: string;
  model?: {
    id: string;
    name: string;
    hourlyEarnings: IHourlyEarnings[];
  };
  positionHistory?: {
    equipmentId: string;
    positions: IPositions[];
  };
  stateHistory?: {
    equipmentId: string;
    states: IStates[];
  };
  state?: {
    id: string;
    name: string;
    color: string;
  };
}
