import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { EquipmentListCard } from '@/modules/equipments/components/equipmentCards';
import { Map } from '@/modules/equipments/components/map';
import { ServiceEquipments } from '@/modules/equipments/forms';

jest.mock('@/modules/equipments/components/equipmentCards', () => ({
  __esModule: true,
  EquipmentListCard: jest.fn(() => <div>EquipmentListCard</div>),
}));

jest.mock('@/modules/equipments/components/map', () => ({
  __esModule: true,
  Map: jest.fn(() => <div>Map</div>),
}));

const setup = () => {
  render(<ServiceEquipments />);
};

test('renders EquipmentListCard and Map components', () => {
  setup();
  expect(screen.getByText('EquipmentListCard')).toBeInTheDocument();
  expect(screen.getByText('Map')).toBeInTheDocument();
});

test('passes state values to EquipmentListCard and Map', () => {
  setup();
  expect(EquipmentListCard).toHaveBeenCalledWith(
    expect.objectContaining({
      model: '',
      search: '',
      selectedState: '',
      setModel: expect.any(Function),
      setSearch: expect.any(Function),
      setSelectedState: expect.any(Function),
    }),
    {}
  );

  expect(Map).toHaveBeenCalledWith(
    expect.objectContaining({
      model: '',
      search: '',
      selectedState: '',
    }),
    {}
  );
});
