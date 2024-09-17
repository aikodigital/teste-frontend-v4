import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { ServiceViewEquipments } from '@/modules/equipments/subpages/viewEquipments/index';

jest.mock('@/modules/equipments/components/equipmentCards', () => ({
  __esModule: true,
  EquipmentListCard: jest.fn(({ model, search, selectedState, id }) => (
    <div>
      <div>EquipmentListCard</div>
      <div>Model: {model}</div>
      <div>Search: {search}</div>
      <div>Selected State: {selectedState}</div>
      <div>ID: {id}</div>
    </div>
  )),
}));

jest.mock('@/modules/equipments/components/map', () => ({
  __esModule: true,
  Map: jest.fn(({ search, selectedState, model, id }) => (
    <div>
      <div>Map</div>
      <div>Search: {search}</div>
      <div>Selected State: {selectedState}</div>
      <div>Model: {model}</div>
      <div>ID: {id}</div>
    </div>
  )),
}));

const setup = (id = 'test-id') => {
  render(<ServiceViewEquipments id={id} />);
};

test('renders EquipmentListCard and Map components', () => {
  setup();
  expect(screen.getByText('EquipmentListCard')).toBeInTheDocument();
  expect(screen.getByText('Map')).toBeInTheDocument();
});
