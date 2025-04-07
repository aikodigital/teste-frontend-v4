import { render, screen, fireEvent } from '@testing-library/react';
import EquipmentHistory from '../components/EquipmentHistory';
import { EquipmentDetail, EquipmentModelEnum, EquipmentStateEnum } from '../types/equipment';

jest.mock('../components/EquipmentStateCard', () => ({ stateName, date }: any) => (
  <div data-testid="equipment-state-card">
    Estado: {stateName} - Data: {date}
  </div>
));

describe('EquipmentHistory', () => {
  const mockOnClose = jest.fn();

  const mockEquipment: EquipmentDetail = {
    id: 'equip-001',
    name: 'CA-0001',
    model: {
      id: 'model-001',
      name: EquipmentModelEnum.CAMINHAO_CARGA,
      hourlyEarnings: [],
    },
    positions: [],
    currentPosition: {
      date: '2025-04-07T09:00:00Z',
      lat: -9.666,
      lon: -35.736,
    },
    currentState: {
      id: 'state-operando',
      name: EquipmentStateEnum.FUNCIONANDO,
      color: '#2ecc71',
    },
    stateHistory: [
      {
        date: '2025-04-07T09:00:00Z',
        equipmentStateId: 'state-operando',
        lat: -9.666,
        lon: -35.736,
        name: EquipmentStateEnum.FUNCIONANDO,
        color: '#2ecc71',
      },
      {
        date: '2025-04-07T08:00:00Z',
        equipmentStateId: 'state-inativo',
        lat: -9.664,
        lon: -35.734,
        name: EquipmentStateEnum.INATIVO,
        color: '#f39c12',
      },
    ],
    productivity: 70,
    earnings: 1000,
  };

  it('deve exibir título, nome do equipamento e histórico de estados', () => {
    render(<EquipmentHistory equipment={mockEquipment} onClose={mockOnClose} />);

    expect(screen.getByText('Histórico do Equipamento')).toBeInTheDocument();
    expect(screen.getByText('CA-0001 - Caminhão de carga')).toBeInTheDocument();
    expect(screen.getAllByTestId('equipment-state-card')).toHaveLength(2);
  });

  it('deve chamar onClose ao clicar no botão de fechar', () => {
    render(<EquipmentHistory equipment={mockEquipment} onClose={mockOnClose} />);
    const closeButton = screen.getByLabelText('Fechar');
    
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve exibir mensagem quando não há histórico de estados', () => {
    const equipmentSemHistorico = { ...mockEquipment, stateHistory: [] };
    
    render(<EquipmentHistory equipment={equipmentSemHistorico} onClose={mockOnClose} />);

    expect(screen.getByText('Nenhum histórico disponível.')).toBeInTheDocument();
  });
});
