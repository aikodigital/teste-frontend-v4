import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterComponent from '../components/FilterComponent';

describe('FilterComponent', () => {
  const mockHandleStateFilterChange = jest.fn();
  const mockHandleModelFilterChange = jest.fn();
  const mockHandleSearchTermChange = jest.fn();

  const stateData = [
    { id: 1, name: 'Operando' },
    { id: 2, name: 'Parado' },
  ];
  const modelData = [
    { id: 1, name: 'Modelo A' },
    { id: 2, name: 'Modelo B' },
  ];

  it('should render correctly with given props', () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <FilterComponent
        equipmentStateFilter=""
        equipmentModelFilter=""
        searchTerm=""
        stateData={stateData}
        modelData={modelData}
        handleStateFilterChange={mockHandleStateFilterChange}
        handleModelFilterChange={mockHandleModelFilterChange}
        handleSearchTermChange={mockHandleSearchTermChange}
      />
    );

    expect(getByLabelText(/Estado/)).toBeInTheDocument();
    expect(getByLabelText(/Modelo:/)).toBeInTheDocument();
    expect(getByLabelText(/Pesquise pelo nome do modelo:/)).toBeInTheDocument();
    expect(getByPlaceholderText(/Digite o nome do modelo/)).toBeInTheDocument();
    expect(getByText('Operando')).toBeInTheDocument();
    expect(getByText('Modelo A')).toBeInTheDocument();
  });

  it('should call handleStateFilterChange on state select change', () => {
    const { getByLabelText } = render(
      <FilterComponent
        equipmentStateFilter=""
        equipmentModelFilter=""
        searchTerm=""
        stateData={stateData}
        modelData={modelData}
        handleStateFilterChange={mockHandleStateFilterChange}
        handleModelFilterChange={mockHandleModelFilterChange}
        handleSearchTermChange={mockHandleSearchTermChange}
      />
    );

    fireEvent.change(getByLabelText(/Estado/), { target: { value: '1' } });
    expect(mockHandleStateFilterChange).toHaveBeenCalled();
  });

  it('should call handleModelFilterChange on model select change', () => {
    const { getByLabelText } = render(
      <FilterComponent
        equipmentStateFilter=""
        equipmentModelFilter=""
        searchTerm=""
        stateData={stateData}
        modelData={modelData}
        handleStateFilterChange={mockHandleStateFilterChange}
        handleModelFilterChange={mockHandleModelFilterChange}
        handleSearchTermChange={mockHandleSearchTermChange}
      />
    );

    fireEvent.change(getByLabelText(/Modelo:/), { target: { value: '1' } });
    expect(mockHandleModelFilterChange).toHaveBeenCalled();
  });

  it('should call handleSearchTermChange on input change', () => {
    const { getByPlaceholderText } = render(
      <FilterComponent
        equipmentStateFilter=""
        equipmentModelFilter=""
        searchTerm=""
        stateData={stateData}
        modelData={modelData}
        handleStateFilterChange={mockHandleStateFilterChange}
        handleModelFilterChange={mockHandleModelFilterChange}
        handleSearchTermChange={mockHandleSearchTermChange}
      />
    );

    fireEvent.change(getByPlaceholderText(/Digite o nome do modelo/), { target: { value: 'Modelo A' } });
    expect(mockHandleSearchTermChange).toHaveBeenCalled();
  });
});
