import { act } from 'react';
import { renderToString } from 'react-dom/server';

import { vi } from 'vitest';

import { EquipmentDetails } from '@/components';
import {
  useEquipmentModels,
  useEquipmentPositionHistory,
  useEquipmentState,
  useEquipmentStateHistory,
  useEquipments
} from '@/hooks';
import { useMarkers } from '@/hooks/useMarkers';
import type {
  EquipmentFromAPI,
  EquipmentModelFromAPI,
  EquipmentPositionHistoryFromAPI,
  EquipmentStateFromAPI,
  EquipmentStateHistoryFromAPI
} from '@/services/types';
import { renderHook } from '@/test/helpers';

vi.mock('@/hooks');

describe('<useMarkers />', () => {
  const mockPositionData: Record<string, EquipmentPositionHistoryFromAPI> = {
    equipment1: {
      equipmentId: 'equipment1',
      positions: [
        {
          date: '2022-01-01',
          lat: -19.1673,
          lon: -46.0034
        }
      ]
    }
  };

  const mockStateHistoryData: Record<string, EquipmentStateHistoryFromAPI> = {
    equipment1: {
      equipmentId: 'equipment1',
      states: [
        {
          date: '2022-01-01',
          equipmentStateId: 'state-1'
        }
      ]
    }
  };

  const mockStateData: EquipmentStateFromAPI[] = [
    {
      id: 'state-1',
      name: 'Operando'
    }
  ];

  const mockEquipmentsData: Record<string, EquipmentFromAPI> = {
    equipment1: {
      id: 'equipment1',
      name: 'Equipamento Teste',
      equipmentModelId: 'model1'
    }
  };

  const mockEquipmentModelsData: Record<string, EquipmentModelFromAPI> = {
    model1: {
      id: 'model1',
      name: 'Modelo Teste'
    }
  };

  beforeEach(() => {
    vi.mocked(useEquipmentPositionHistory).mockReturnValue({
      data: mockPositionData as Record<string, EquipmentPositionHistoryFromAPI> | undefined
    });
    vi.mocked(useEquipmentStateHistory).mockReturnValue({
      data: mockStateHistoryData as Record<string, EquipmentStateHistoryFromAPI> | undefined
    });
    vi.mocked(useEquipmentState).mockReturnValue({
      data: mockStateData as EquipmentStateFromAPI[] | undefined
    });
    vi.mocked(useEquipments).mockReturnValue({
      data: mockEquipmentsData as Record<string, EquipmentFromAPI> | undefined
    });
    vi.mocked(useEquipmentModels).mockReturnValue({
      data: mockEquipmentModelsData as Record<string, EquipmentModelFromAPI> | undefined
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return an empty list if any data is missing', () => {
    vi.mocked(useEquipmentPositionHistory).mockReturnValueOnce({ data: undefined });

    const { result } = renderHook(() => useMarkers());

    act(() => {
      expect(result.current).toEqual([]);
    });
  });

  it('should return markers with coordinates, popupValue and tooltipValue', () => {
    const { result } = renderHook(() => useMarkers());

    act(() => {
      const expectedMarkers = [
        {
          coordinates: [-19.1673, -46.0034],
          popupValue: renderToString(
            <EquipmentDetails
              equipmentId="equipment1"
              stateHistory={mockStateHistoryData}
              states={mockStateData}
              equipments={mockEquipmentsData}
              equipmentModels={mockEquipmentModelsData}
            />
          ),
          tooltipValue: 'Posição atual: -19.1673, -46.0034'
        }
      ];

      expect(result.current).toHaveLength(1);
      expect(result.current[0].coordinates).toEqual(expectedMarkers[0]?.coordinates);
      expect(result.current[0].tooltipValue).toBe(expectedMarkers[0]?.tooltipValue);
      expect(result.current[0].popupValue).toBe(expectedMarkers[0]?.popupValue);
    });
  });
});
