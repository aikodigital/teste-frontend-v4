import { render, screen } from '@testing-library/react';

import { EquipmentDetails } from '@/components';
import {
  EquipmentFromAPI,
  EquipmentModelFromAPI,
  EquipmentStateFromAPI,
  EquipmentStateHistoryFromAPI
} from '@/services/types';

describe('<EquipmentDetails />', () => {
  const mockStateHistory: Record<string, EquipmentStateHistoryFromAPI> = {
    'equipment-1': {
      equipmentId: 'equipment-1',
      states: [
        { date: '2023-09-16', equipmentStateId: 'state-1' },
        { date: '2023-09-17', equipmentStateId: 'state-2' }
      ]
    }
  };

  const mockStates: EquipmentStateFromAPI[] = [
    { id: 'state-1', name: 'Operando', color: '#2ecc71' },
    { id: 'state-2', name: 'Manutenção', color: '#e74c3c' }
  ];

  const mockEquipments: Record<string, EquipmentFromAPI> = {
    'equipment-1': {
      id: 'equipment-1',
      name: 'Equipamento Teste',
      equipmentModelId: 'model-1'
    }
  };

  const mockEquipmentModels: Record<string, EquipmentModelFromAPI> = {
    'model-1': {
      id: 'model-1',
      name: 'Modelo Teste',
      hourlyEarnings: []
    }
  };

  it('should render equipment details with valid data', () => {
    render(
      <EquipmentDetails
        equipmentId="equipment-1"
        stateHistory={mockStateHistory}
        states={mockStates}
        equipments={mockEquipments}
        equipmentModels={mockEquipmentModels}
      />
    );

    expect.soft(screen.getByText(/Nome: Equipamento Teste/)).toBeInTheDocument();
    expect.soft(screen.getByText(/Modelo: Modelo Teste/)).toBeInTheDocument();
    expect.soft(screen.getByText(/Estado Atual: Manutenção/)).toBeInTheDocument();
  });

  it('should render "Equipamento não encontrado" when equipment is missing', () => {
    render(
      <EquipmentDetails
        equipmentId="equipment-desconhecido"
        stateHistory={mockStateHistory}
        states={mockStates}
        equipments={mockEquipments}
        equipmentModels={mockEquipmentModels}
      />
    );

    expect(screen.getByText(/Equipamento não encontrado/)).toBeInTheDocument();
  });

  it('should render "Desconhecido" only for the state when state is missing', () => {
    render(
      <EquipmentDetails
        equipmentId="equipment-1"
        stateHistory={mockStateHistory}
        states={[]}
        equipments={mockEquipments}
        equipmentModels={mockEquipmentModels}
      />
    );

    expect(screen.getByText(/Estado Atual: Desconhecido/)).toBeInTheDocument();
  });

  it('should render "Nenhum histórico disponível" when state history is missing', () => {
    render(
      <EquipmentDetails
        equipmentId="equipment-1"
        stateHistory={{}}
        states={mockStates}
        equipments={mockEquipments}
        equipmentModels={mockEquipmentModels}
      />
    );

    expect(screen.getByText(/Nenhum histórico disponível/)).toBeInTheDocument();
  });
});
