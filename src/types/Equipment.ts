import { EquipmentModelProps } from "./EquipmentModel";
import { EquipmentsPositionHistoryProps } from "./EquipmentPositionHistory";
import { EquipmentStateProps } from "./EquipmentsState";

export interface EquipmentProps {
  id: string;
  equipmentModelId: string;
  name: string;
}
export interface MappedEquipmentDataProps extends EquipmentProps {
  equipmentModel: EquipmentModelProps
  state: (EquipmentStateProps & {
    equipmentStateId: string;
  })[];
  position?: EquipmentsPositionHistoryProps["positions"];
  lastState: {
    date: string | null;
    time: string | null;
    id: string;
    name: string;
    color: string;
    equipmentStateId: string;
  } | null;
  lastPosition: {
    lat: number;
    lon: number;
  } | null;
}