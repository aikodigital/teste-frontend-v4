import { render, screen, fireEvent } from '@testing-library/react';
import EquipmentFilter from '../components/EquipmentFilters';
import { EquipmentDetail, EquipmentModelEnum, EquipmentStateEnum } from '../types/equipment';
import userEvent from '@testing-library/user-event';

jest.mock('../components/EquipmentCard', () => ({ equipment }: any) => (
  <div data-testid="equipment-card">{equipment.name}</div>
));

describe('EquipmentFilter', () => {
  const mockSetModel = jest.fn();
  const mockSetState = jest.fn();

  const equipmentListMock: EquipmentDetail[] = [
    {
      id: '1',
      name: 'EQ-01',
      model: {
        id: 'model-01',
        name: EquipmentModelEnum.CAMINHAO_CARGA,
        hourlyEarnings: [],
      },
      currentPosition: {
        date: '2025-04-07T09:00:00Z',
        lat: -9.665,
        lon: -35.735,
      },
      positions: [],
      currentState: {
        id: 'state-01',
        name: EquipmentStateEnum.FUNCIONANDO,
        color: '#00ff00',
      },
      stateHistory: [],
      productivity: 85,
      earnings: 1200,
    },
  ];

  it('deve renderizar campos de filtro e lista de equipamentos', () => {
    render(
      <EquipmentFilter
        selectedModel=""
        selectedState=""
        setSelectedModel={mockSetModel}
        setSelectedState={mockSetState}
        equipmentList={equipmentListMock}
      />
    );

    expect(screen.getByLabelText('Modelo')).toBeInTheDocument();
    expect(screen.getByLabelText('Estado')).toBeInTheDocument();
    expect(screen.getByText('Filtrar Equipamentos')).toBeInTheDocument();
    expect(screen.getByTestId('equipment-card')).toHaveTextContent('EQ-01');
  });

  it('deve chamar setSelectedState ao trocar o estado', async () => {
    render(
      <EquipmentFilter
        selectedModel=""
        selectedState=""
        setSelectedModel={mockSetModel}
        setSelectedState={mockSetState}
        equipmentList={equipmentListMock}
      />
    );

    const user = userEvent.setup();
    const estadoSelect = screen.getByLabelText('Estado');

    await user.click(estadoSelect);

    const option = await screen.findByRole('option', {
      name: EquipmentStateEnum.MANUTENCAO,
    });

    await user.click(option);

    expect(mockSetState).toHaveBeenCalledWith(EquipmentStateEnum.MANUTENCAO);
  });

  it('deve exibir mensagem quando não houver equipamentos', () => {
    render(
      <EquipmentFilter
        selectedModel=""
        selectedState=""
        setSelectedModel={mockSetModel}
        setSelectedState={mockSetState}
        equipmentList={[]}
      />
    );

    expect(screen.getByText('Nenhum equipamento encontrado.')).toBeInTheDocument();
  });
});
