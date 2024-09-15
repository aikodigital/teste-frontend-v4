import React from 'react';

import { useEquipmentState, useEquipmentStateHistory } from '@/hooks';

interface EquipmentDetailsProps {
  equipmentId: string;
}

export const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ equipmentId }) => {
  const { data: stateHistory } = useEquipmentStateHistory();
  const { data: states } = useEquipmentState();

  const stateNames = states?.reduce(
    (acc, state) => {
      acc[state.id] = state.name;
      return acc;
    },
    {} as Record<string, string>
  );

  const equipmentStateHistory = stateHistory?.[equipmentId];
  const equipmentCurrentStateId =
    equipmentStateHistory?.states?.[equipmentStateHistory.states.length - 1]?.equipmentStateId;
  const equipmentCurrentState = equipmentCurrentStateId
    ? (stateNames?.[equipmentCurrentStateId] ?? 'Desconhecido')
    : 'Desconhecido';

  return (
    <div>
      <h2>Equipamento: {equipmentId}</h2>
      <h2>Estado Atual: {equipmentCurrentState}</h2>
      <h3>Histórico de Estados:</h3>
      <ul>
        {equipmentStateHistory?.states.map((state) => (
          <li key={state.date}>
            Data: {new Date(state.date).toLocaleString()} - Estado:{' '}
            {stateNames?.[state.equipmentStateId] ?? 'Desconhecido'}
          </li>
        )) ?? 'Nenhum histórico disponível'}
      </ul>
    </div>
  );
};
