import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface EquipmentDetailsProps {
  equipmentId: string;
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ equipmentId }) => {
  const stateHistory = useSelector((state: RootState) =>
    state.equipment.equipmentStateHistory.find((sh) => sh.equipmentId === equipmentId)
  );
  const states = useSelector((state: RootState) => state.equipment.equipmentState);

  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h2 className="text-lg font-bold mb-4">Histórico de Estados</h2>
      <ul>
        {stateHistory?.states.map((history: any, index: number) => {
          const state = states.find((s) => s.id === history.equipmentStateId);
          return (
            <li key={index} className="mb-2">
              {new Date(history.date).toLocaleString()} -{' '}
              <span className="font-medium" style={{ color: state?.color }}>
                {state?.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EquipmentDetails;
