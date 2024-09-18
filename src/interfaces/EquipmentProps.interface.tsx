import { PositionProps } from './EquipmentPositionProps.interface';

export interface EquipmentProps {
  id: string;
  name: string;
  equipmentModelId: string;
}

export interface EquipmentPropsToLeaflet {
  currentState: string | undefined;
  currentPosition: PositionProps | undefined;
  id: string;
  name: string;
  equipmentModelId: string;
}

export interface EquipmentPropsToMarker {
  currentState: string;
  currentPosition: PositionProps;
  id: string;
  name: string;
  equipmentModelId: string;
}
