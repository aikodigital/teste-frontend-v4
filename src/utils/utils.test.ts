// src/utils/utils.test.ts
import { describe, expect, it } from 'vitest';
import { calculateProductivity, EquipmentStateHistory } from './utils';

describe('calculateProductivity', () => {
  it('retorna 75% quando operou por 18 horas em 24h', () => {
    const mockHistory: EquipmentStateHistory = {
      equipmentId: '1',
      states: [
        { date: '2025-04-04T00:00:00Z', equipmentStateId: 'operando' },
        { date: '2025-04-04T18:00:00Z', equipmentStateId: 'parado' },
      ],
    };

    const result = calculateProductivity(mockHistory, 'operando');
    expect(result).toBe(75);
  });

  it('retorna 0% se não tiver estados', () => {
    const mockHistory: EquipmentStateHistory = {
      equipmentId: '2',
      states: [],
    };

    const result = calculateProductivity(mockHistory, 'operando');
    expect(result).toBe(0);
  });
});
