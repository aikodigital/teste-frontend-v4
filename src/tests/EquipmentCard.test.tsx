import { render, screen } from '@testing-library/react';
import EquipmentCard from '../components/EquipmentCard';
import { EquipmentDetail } from '../types/equipment';

jest.mock('../utils/statusIcon', () => ({
  getStatusIcon: (status: string) => `Ícone: ${status}`,
}));

describe('EquipmentCard', () => {
  it('deve renderizar o nome, modelo e estado do equipamento', () => {
    const mockEquipment: EquipmentDetail = {
      id: 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9',
      name: 'CA-0001',
      model: {
        id: 'a3540227-2f0e-4362-9517-92f41dabbfdf',
        name: 'Caminhão de carga',
        hourlyEarnings: [
          {
            equipmentStateId: '0808344c-454b-4c36-89e8-d7687e692d57',
            value: 100,
          },
        ],
      },
      positions: [
        {
          date: '2021-02-01T03:00:00.000Z',
          lat: -19.126536,
          lon: -45.947756,
        },
      ],
      currentPosition: {
        date: '2021-02-01T03:00:00.000Z',
        lat: -19.126536,
        lon: -45.947756,
      },
      currentState: {
        id: '0808344c-454b-4c36-89e8-d7687e692d57',
        name: 'Operando',
        color: '#2ecc71',
      },
      stateHistory: [
        {
          date: '2021-02-01T03:00:00.000Z',
          equipmentStateId: '0808344c-454b-4c36-89e8-d7687e692d57',
          lat: -19.126536,
          lon: -45.947756,
          name: 'Operando',
          color: '#2ecc71',
        },
      ],
      productivity: 90,
      earnings: 1000,
    };

    render(<EquipmentCard equipment={mockEquipment} />);

    expect(screen.getByText('CA-0001')).toBeInTheDocument();
    expect(screen.getByText(/Modelo: Caminhão de carga/)).toBeInTheDocument();
    expect(screen.getByText(/Estado atual: Operando/)).toBeInTheDocument();
    expect(screen.getByText('Ícone: Operando')).toBeInTheDocument();
  });
});
