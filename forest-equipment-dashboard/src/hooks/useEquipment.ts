import equipmentStateJson from '../../data/equipmentState.json';
import equipmentStateHistoryJson from '../../data/equipmentStateHistory.json';
import equipmentPositionHistoryJson from '../../data/equipmentPositionHistory.json';
import equipmentJson from '../../data/equipment.json';
import equipmentModelJson from '../../data/equipmentModel.json';
import {
  IEquipment,
  IEquipmentsModel,
  IEquipmentsPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory,
} from '../../@types/equipment';
import { useCallback, useMemo } from 'react';

function useEquipment() {
  const equipment = equipmentJson as IEquipment[];
  const equipmentPositionHistory =
    equipmentPositionHistoryJson as IEquipmentsPositionHistory[];
  const equipmentStateHistory =
    equipmentStateHistoryJson as IEquipmentStateHistory[];
  const equipmentState = equipmentStateJson as IEquipmentState[];
  const equipmentModel = equipmentModelJson as IEquipmentsModel[];

  const getEquipmentLastState = useCallback(
    (equipmentId: string) => {
      const equipmentHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === equipmentId,
      );

      if (!equipmentHistory || equipmentHistory.states.length === 0)
        return null;

      const lastStateId =
        equipmentHistory.states[equipmentHistory.states.length - 1]
          ?.equipmentStateId;
      if (!lastStateId) return null;

      console.log(equipmentState.find((state) => state.id === lastStateId));

      return equipmentState.find((state) => state.id === lastStateId) || null;
    },
    [equipmentStateHistory, equipmentState],
  );

  const getEquipmentLastPosition = useMemo(() => {
    const positions = equipmentPositionHistory.map((equip) => {
      const lastPositionEntry = equip.positions[equip.positions.length - 1];

      return {
        position: lastPositionEntry,
        equipmentId: equip.equipmentId,
      };
    });

    return positions;
  }, [equipmentPositionHistory]);

  const getEquipmentInfo = useCallback(
    (equipmentId: string) => {
      const equipmentData = equipment.find((equip) => equip.id === equipmentId);
      if (!equipmentData) return null;

      const equipmentModelData = equipmentModel.find(
        (model) => model.id === equipmentData.equipmentModelId,
      );

      const equipmentStateData = getEquipmentLastState(equipmentId);
      return {
        name: equipmentData.name,
        modelName: equipmentModelData?.name,
        state: {
          name: equipmentStateData?.name,
          color: equipmentStateData?.color,
        },
      };
    },
    [equipment, equipmentModel, getEquipmentLastState],
  );

  const getStateHistory = useCallback(
    (equipmentId: string) => {
      const equipmentHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === equipmentId,
      );

      if (!equipmentHistory) return null;

      const states = equipmentHistory.states.map((state) => {
        const stateData = equipmentState.find(
          (equipmentState) => equipmentState.id === state.equipmentStateId,
        );

        return stateData
          ? {
              id: state.equipmentStateId,
              name: stateData.name,
              color: stateData.color,
              date: state.date,
            }
          : null;
      });

      return states;
    },
    [equipmentStateHistory, equipmentState],
  );

  return {
    getEquipmentLastPosition,
    getEquipmentInfo,
    getStateHistory,
  };
}

export default useEquipment;
