import React from 'react';
import { useSelector } from 'react-redux';

const EquipmentHistory = ({ equipmentId }) => {
  const { equipmentStateHistory, equipmentState } = useSelector(state => state.equipment);
  
  // Obter o histórico de estados do equipamento específico
  const history = equipmentStateHistory.find(e => e.equipmentId === equipmentId)?.states || [];

  return (
    <div>
      <h5>Histórico de Estados</h5>
      <ul>
        {history.map((state, index) => {
          const stateInfo = equipmentState.find(s => s.id === state.equipmentStateId);
          const stateName = stateInfo?.name || 'Desconhecido';
          const stateColor = stateInfo?.color || '#000';

          return (
            <li key={index} style={{ color: stateColor }}>
              <strong>{stateName}</strong> - {new Date(state.date).toLocaleString()}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EquipmentHistory;
