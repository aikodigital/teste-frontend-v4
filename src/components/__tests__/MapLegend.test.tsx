import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapLegend from '../MapLegend';

const mockEquipmentStates = [
  { id: '1', name: 'Operating', color: 'green' },
  { id: '2', name: 'Idle', color: 'yellow' },
];

const mockEquipmentTypes = [
  { name: 'Harvester', icon: 'harvester-icon.png' },
  { name: 'Truck', icon: 'truck-icon.png' },
];

describe('MapLegend', () => {
  it('renders the legend title', () => {
    render(<MapLegend equipmentStates={mockEquipmentStates} equipmentTypes={mockEquipmentTypes} />);
    expect(screen.getByText('Legenda')).toBeInTheDocument();
  });

  it('expands and collapses when clicked', () => {
    render(<MapLegend equipmentStates={mockEquipmentStates} equipmentTypes={mockEquipmentTypes} />);

    // Initially, the content should be visible (expanded)
    expect(screen.getByText('Estados dos Equipamentos')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText('Legenda'));
    expect(screen.queryByText('Estados dos Equipamentos')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText('Legenda'));
    expect(screen.getByText('Estados dos Equipamentos')).toBeInTheDocument();
  });

  it('renders equipment states', () => {
    render(<MapLegend equipmentStates={mockEquipmentStates} equipmentTypes={mockEquipmentTypes} />);
    expect(screen.getByText('Operating')).toBeInTheDocument();
    expect(screen.getByText('Idle')).toBeInTheDocument();
  });

  it('renders equipment types', () => {
    render(<MapLegend equipmentStates={mockEquipmentStates} equipmentTypes={mockEquipmentTypes} />);
    expect(screen.getByText('Harvester')).toBeInTheDocument();
    expect(screen.getByText('Truck')).toBeInTheDocument();
  });
});
