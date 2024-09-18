import { calculateProductivity, calculateEarnings } from '../../utils/equipmentCalculations';

test('should calculate correct productivity', () => {
  const stateHistory = [
    { state: 'Operando', hours: 18 },
    { state: 'Parado', hours: 6 },
  ];
  const result = calculateProductivity(stateHistory);
  expect(result).toBe(75); // 18/24 * 100
});

test('should calculate correct earnings', () => {
  const stateHistory = [
    { equipmentStateId: 'operando', hours: 10 },
    { equipmentStateId: 'manutencao', hours: 4 },
  ];
  const equipmentModel = {
    hourlyEarnings: [
      { equipmentStateId: 'operando', value: 100 },
      { equipmentStateId: 'manutencao', value: -20 },
    ],
  };
  const result = calculateEarnings(stateHistory, equipmentModel);
  expect(result).toBe(920); // 10 * 100 + 4 * -20
});
