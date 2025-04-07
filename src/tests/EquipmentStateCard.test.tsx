import { render, screen } from '@testing-library/react';
import EquipmentStateCard from '../components/EquipmentStateCard';

jest.mock('../utils/statusIcon', () => ({
  getStatusIcon: (status: string) => <span data-testid="status-icon">Ícone: {status}</span>,
}));

describe('EquipmentStateCard', () => {
  it('deve renderizar o estado, a data formatada e o ícone', () => {
    const stateName = 'Operando';
    const date = '2021-02-01T03:00:00.000Z';

    render(<EquipmentStateCard stateName={stateName} date={date} />);

    expect(screen.getByText(stateName)).toBeInTheDocument();
    expect(screen.getByTestId('status-icon')).toHaveTextContent(`Ícone: ${stateName}`);
    
    const formatted = new Date(date).toLocaleString();
    expect(screen.getByText(formatted)).toBeInTheDocument();
    expect(screen.getByText(/Nenhuma observação adicional/)).toBeInTheDocument();
  });
});
