import React from 'react';

import {
  EquipmentFromAPI,
  EquipmentModelFromAPI,
  EquipmentStateFromAPI,
  EquipmentStateHistoryFromAPI
} from '@/services/types';

interface EquipmentDetailsProps {
  equipmentId: string;
  stateHistory: Record<string, EquipmentStateHistoryFromAPI>;
  states: EquipmentStateFromAPI[];
  equipments: Record<string, EquipmentFromAPI>;
  equipmentModels: Record<string, EquipmentModelFromAPI>;
}

export const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({
  equipmentId,
  stateHistory,
  states,
  equipments,
  equipmentModels
}) => {
  const stateNames = states.reduce<Record<string, string>>((acc, state) => {
    acc[state.id] = state.name;
    return acc;
  }, {});

  const equipmentStateHistory = stateHistory[equipmentId];
  const equipmentCurrentStateId =
    equipmentStateHistory?.states?.[equipmentStateHistory.states.length - 1]?.equipmentStateId;
  const equipmentCurrentState = equipmentCurrentStateId
    ? (stateNames?.[equipmentCurrentStateId] ?? 'Desconhecido')
    : 'Desconhecido';

  const equipment = equipments[equipmentId];
  const equipmentModel = equipmentModels[equipment?.equipmentModelId ?? ''];

  if (!equipment) {
    return <div>Equipamento não encontrado.</div>;
  }

  return (
    <div>
      <h2>Nome: {equipment?.name}</h2>
      <h2>Modelo: {equipmentModel?.name}</h2>
      <h2>Estado Atual: {equipmentCurrentState}</h2>
      <h3>Histórico de Estados:</h3>
      <ul>
        {equipmentStateHistory?.states.map((state) => (
          <li key={state.date}>
            <strong>Data: </strong>
            {new Date(state.date).toLocaleString()} - <strong>Estado: </strong>{' '}
            {stateNames?.[state.equipmentStateId] ?? 'Desconhecido'}
          </li>
        )) ?? 'Nenhum histórico disponível'}
      </ul>
    </div>
  );
};
