import Equipments from '../challenge-info/data/equipment.json';
import { PositionProps } from '../interfaces/EquipmentPositionProps.interface';

export const formatEquipmentsData = (
  equipmentsState: { equipmentId: string; currentState: string }[],
  equipmentsPosition: {
    equipmentId: string;
    currentPosition: PositionProps;
  }[],
) => {
  const currentEquipments = Equipments.map((item) => {
    const currentState = equipmentsState.find(
      (machine) => machine.equipmentId === item.id,
    )?.currentState;

    const currentPosition = equipmentsPosition.find(
      (info) => info.equipmentId === item.id,
    )?.currentPosition;

    return { ...item, currentState, currentPosition };
  });

  return currentEquipments;
};
