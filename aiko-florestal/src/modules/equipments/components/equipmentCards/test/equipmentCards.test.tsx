import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { EquipmentListCard } from '@/modules/equipments/components/equipmentCards';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useEquipments', () => ({
  __esModule: true,
  default: () => ({
    equipmentsMapped: [
      {
        id: '1',
        name: 'Excavator',
        modelName: 'Harvester',
        status: 'Operando',
        position: { lat: '123', lon: '456', date: '2024-01-01' },
        stateHistory: [
          { date: '2024-01-01', equipmentStateId: '1', name: 'Operando' },
        ],
      },
    ],
  }),
}));

const setup = () => {
  render(
    <Router>
      <EquipmentListCard
        search=""
        setSearch={() => {}}
        selectedState=""
        setSelectedState={() => {}}
        model=""
        setModel={() => {}}
      />
    </Router>
  );
};

test('renders without crashing', () => {
  setup();
  expect(screen.getByText('Visualização Rápida')).toBeInTheDocument();
});

test('displays correct number of items per page', () => {
  setup();
});

test('shows and hides filters', () => {
  setup();
  const filterButton = screen.getByText('Filtros');
  fireEvent.click(filterButton);
  expect(screen.getByPlaceholderText('Pesquise o nome de um equipamento')).toBeVisible();

  fireEvent.click(filterButton);
  expect(screen.queryByPlaceholderText('Pesquise o nome de um equipamento')).toBeNull();
});
