import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from './page';
import useEquipmentStore from '../store/useEquipmentStore';

jest.mock('../store/useEquipmentStore');

describe('Page Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('deve renderizar o título do projeto', () => {
    (useEquipmentStore as jest.Mock).mockReturnValue({
      countEquipmentsInState: jest.fn(() => 0),
    });

    render(<Page />);

    expect(screen.getByText(/Projeto Aiko/i)).toBeInTheDocument();
  });

  it('deve exibir as contagens corretas de equipamentos', () => {
    const mockCountEquipmentsInState = jest.fn((stateName) => {
      if (stateName === 'Operando') return 5;
      if (stateName === 'Manutenção') return 2;
      if (stateName === 'Parado') return 3;
      return 0;
    });

    (useEquipmentStore as jest.Mock).mockReturnValue({
      countEquipmentsInState: mockCountEquipmentsInState,
    });

    render(<Page />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
