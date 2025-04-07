import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MapView from '../components/MapView';
import { EquipmentDetail, EquipmentModelEnum } from '../types/equipment';
import * as scriptLoader from '../utils/loadGoogleMapsScript';

jest.mock('../utils/loadGoogleMapsScript', () => jest.fn());

const mockEquipmentList: EquipmentDetail[] = [
  {
    id: '1',
    name: 'Equipamento 1',
    model: {
      id: 'model-001',
      name: EquipmentModelEnum.CAMINHAO_CARGA,
      hourlyEarnings: [],
    },
    currentState: {
      id: 'state-1',
      name: 'Operando',
      color: '#4caf50',
    },
    currentPosition: {
      lat: -15.0,
      lon: -47.0,
      date: new Date().toISOString(),
    },
    stateHistory: [],
    positions: [],
    productivity: 10,
    earnings: 10,
  },
  {
    id: '2',
    name: 'Equipamento 2',
    model: {
      id: 'model-002',
      name: EquipmentModelEnum.HARVESTER,
      hourlyEarnings: [],
    },
    currentState: {
      id: 'state-2',
      name: 'Parado',
      color: '#f44336',
    },
    currentPosition: {
      lat: -16.0,
      lon: -48.0,
      date: new Date().toISOString(),
    },
    stateHistory: [],
    positions: [],
    productivity: 10,
    earnings: 10,
  },
];

describe('MapView', () => {
  beforeEach(() => {
    (scriptLoader.default as jest.Mock).mockClear();
  });

  it('deve renderizar o componente de filtro inicialmente', () => {
    render(<MapView equipmentList={mockEquipmentList} />);

    expect(screen.getByText('Filtrar Equipamentos')).toBeInTheDocument();
    expect(screen.getByLabelText('Modelo')).toBeInTheDocument();
    expect(screen.getByLabelText('Estado')).toBeInTheDocument();
  });

  it('deve renderizar os equipamentos filtrados', async () => {
    render(<MapView equipmentList={mockEquipmentList} />);

    const modeloSelect = screen.getByLabelText('Modelo') as HTMLInputElement;
    fireEvent.change(modeloSelect, { target: { value: 'Caminhão X' } });

    await waitFor(() => {
      expect(screen.getByText('Equipamento 1 - Caminhão X')).toBeInTheDocument();
    });
  });

  it('deve carregar o script do Google Maps', () => {
    render(<MapView equipmentList={mockEquipmentList} />);

    expect(scriptLoader.default).toHaveBeenCalled();
  });
});
