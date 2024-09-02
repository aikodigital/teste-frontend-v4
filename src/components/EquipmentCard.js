import React from 'react';
import { useSelector } from 'react-redux';

const EquipmentCard = ({ equipmentId }) => {
  const { equipment, equipmentState, equipmentPositionHistory, equipmentStateHistory } = useSelector(state => state.equipment);
  
  // Encontrar o equipamento específico
  const equip = equipment.find(eq => eq.id === equipmentId);
  
  // Obter a última posição do equipamento
  const latestPosition = equipmentPositionHistory.find(e => e.equipmentId === equipmentId)?.positions.slice(-1)[0];
  
  // Obter o último estado do equipamento
  const latestState = equipmentStateHistory.find(e => e.equipmentId === equipmentId)?.states.slice(-1)[0];
  
  // Obter o nome do estado mais recente
  const stateInfo = equipmentState.find(s => s.id === latestState?.equipmentStateId);
  const stateName = stateInfo?.name || 'Desconhecido';
  const stateColor = stateInfo?.color || '#000';

  return (
    <div className="card">
      <h5 className="card-title">{equip?.name || 'Equipamento Desconhecido'}</h5>
      <p>Última Posição: {latestPosition ? `${latestPosition.lat}, ${latestPosition.lon}` : 'Desconhecida'}</p>
      <p>Estado Atual: <span style={{ color: stateColor }}>{stateName}</span></p>
    </div>
  );
};

export default EquipmentCard;
