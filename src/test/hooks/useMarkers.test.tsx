import { act } from 'react';
import { renderToString } from 'react-dom/server';

import {
  QueryObserverLoadingErrorResult,
  QueryObserverSuccessResult,
  UseQueryResult
} from '@tanstack/react-query';
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

  const mockStateData: Partial<EquipmentStateFromAPI>[] = [
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
      name: 'Modelo Teste',
      hourlyEarnings: []
    }
  };

  beforeEach(() => {
    vi.mocked(useEquipmentPositionHistory).mockReturnValue({
      data: mockPositionData
    } as UseQueryResult<Record<string, EquipmentPositionHistoryFromAPI>>);
    vi.mocked(useEquipmentStateHistory).mockReturnValue({
      data: mockStateHistoryData
    } as UseQueryResult<Record<string, EquipmentStateHistoryFromAPI>>);
    vi.mocked(useEquipmentState).mockReturnValue({
      data: mockStateData
    } as UseQueryResult<EquipmentStateFromAPI[]>);
    vi.mocked(useEquipments).mockReturnValue({
      data: mockEquipmentsData
    } as QueryObserverSuccessResult<Record<string, EquipmentFromAPI>>);
    vi.mocked(useEquipmentModels).mockReturnValue({
      data: mockEquipmentModelsData
    } as QueryObserverSuccessResult<Record<string, EquipmentModelFromAPI>>);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return an empty list if any data is missing', () => {
    vi.mocked(useEquipmentPositionHistory).mockReturnValueOnce({
      data: undefined
    } as QueryObserverLoadingErrorResult<Record<string, EquipmentPositionHistoryFromAPI>>);

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
              states={mockStateData as EquipmentStateFromAPI[]}
              equipments={mockEquipmentsData}
              equipmentModels={mockEquipmentModelsData}
            />
          ),
          tooltipValue: 'Posição atual: -19.1673, -46.0034'
        }
      ];

      expect.soft(result.current).toHaveLength(1);
      expect.soft(result.current[0].coordinates).toEqual(expectedMarkers[0]?.coordinates);
      expect.soft(result.current[0].tooltipValue).toBe(expectedMarkers[0]?.tooltipValue);
      expect.soft(result.current[0].popupValue).toBe(expectedMarkers[0]?.popupValue);
    });
  });
});
