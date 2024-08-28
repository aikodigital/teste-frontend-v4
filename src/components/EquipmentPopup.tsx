import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface EquipmentPopupProps {
  equipmentId: string;
}

const EquipmentPopup: React.FC<EquipmentPopupProps> = ({ equipmentId }) => {
  const equipment = useSelector((state: RootState) =>
    state.equipment.equipment.find((eq) => eq.id === equipmentId)
  );
  const latestState = useSelector((state: RootState) => {
    const stateHistory = state.equipment.equipmentStateHistory.find((sh) => sh.equipmentId === equipmentId);
    const latestStateId = stateHistory?.states[0].equipmentStateId;
    return state.equipment.equipmentState.find((state) => state.id === latestStateId);
  });

  return (
    <div>
      <h2>{equipment?.name}</h2>
      <p>Estado Atual: {latestState?.name}</p>
    </div>
  );
};

export default EquipmentPopup;
