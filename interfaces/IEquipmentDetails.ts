import type {
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from '~/interfaces/equipment';

export interface IEquipmentDetails {
  id: string;
  name: string;
  model: IEquipmentModel | undefined;
  currentState: IEquipmentState | undefined;
  stateHistory: IEquipmentStateHistory['states'];
  currentPosition: { lat: number; lon: number };
  positionHistory: IEquipmentPositionHistory['positions'];
}