import { renderHook, waitFor } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { useHomeHooks } from './home'

const mockEquipment = [
  { id: '1', equipmentModelId: 'model1', name: 'Equip 1' },
];
const mockEquipmentModel = [
  {
    id: 'model1',
    name: 'Model 1',
    hourlyEarnings: [
      { equipmentStateId: 'state1', value: 100 },
      { equipmentStateId: 'state2', value: -50 },
    ]
  },
];
const mockPositionHistory = [
  { equipmentId: '1', positions: [{ date: '2023-01-01T00:00:00Z', lat: 10, lon: 20 }] }
];
const mockEquipmentState = [
  { id: 'state1', name: 'Operando', color: 'green' },
  { id: 'state2', name: 'Manutenção', color: 'red' },
];
const mockStateHistory = [
  {
    equipmentId: '1',
    states: [
      { date: '2023-01-01T01:00:00Z', equipmentStateId: 'state1' },
      { date: '2023-01-01T05:00:00Z', equipmentStateId: 'state2' },
      { date: '2023-01-01T06:00:00Z', equipmentStateId: 'state1' },
      { date: '2023-01-02T06:00:00Z', equipmentStateId: 'state2' },
    ]
  },
];

(global.fetch as unknown) = vi.fn((url) => {
  if (url === '/api/equipment') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEquipment),
    });
  }
  if (url === '/api/equipment/model') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEquipmentModel),
    });
  }
  if (url === '/api/equipment/position/history') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockPositionHistory),
    });
  }
  if (url === '/api/equipment/state') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEquipmentState),
    });
  }
  if (url === '/api/equipment/state/history') {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockStateHistory),
    });
  }
  return Promise.reject(new Error('Unknown API call'));
});

describe('useHomeHooks', () => {
  it('should load equipment data and calculate productivity and gain', async () => {
    const { result } = renderHook(() => useHomeHooks());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data[0].name).toBe(mockEquipment[0].name);
      expect(result.current.data[0].productivityPercentage).toBe('80.00');
      expect(result.current.data[0].equipmentGain).toBe((4 * 100) + (1 * -50));
    });
  });
});
