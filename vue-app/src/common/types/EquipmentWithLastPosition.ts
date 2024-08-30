import EquipmentModel from "./EquipmentModel";
import { Position } from "./EquipmentPositionHistory";
import EquipmentState from "./EquipmentState";

type EquipmentWithLastPosition = {
    id: string;
    name: string;
    equipmentModelId: string;
    lastPosition: Position | undefined;
    lastState: EquipmentState | undefined | null;
    model: EquipmentModel | undefined;
}

export default EquipmentWithLastPosition;