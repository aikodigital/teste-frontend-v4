import type {
  IEquipmentModel,
  IEquipmentPositionHistory
} from '~/interfaces/equipment';

export interface IEquipmentDetails {
  id: string;
  name: string;
  model: IEquipmentModel | undefined;
  currentState: string | undefined;
  stateHistory: { date: string; name: string }[];
  currentPosition: { lat: number; lon: number };
  positionHistory: IEquipmentPositionHistory['positions'];
}