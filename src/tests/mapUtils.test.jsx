import { calculateProductivity, calculateGain, getStateName, getIcon } from '../utils/mapUtils';
import L from 'leaflet';

// Teste para a função getIcon
test('getIcon should return correct icon for operating state', () => {
  const model = { name: 'Excavator' };
  const state = 'Operando';
  const icon = getIcon(model, state);
  expect(icon.options.html).toContain('background-color:#00FF00');
  expect(icon.options.html).toContain('E'); 
});

// Teste para a função calculateProductivity
test('calculateProductivity should calculate productivity correctly', () => {
  const stateHistory = [
    { date: '2023-09-01T00:00:00Z', equipmentStateId: 1 },
    { date: '2023-09-02T00:00:00Z', equipmentStateId: 2 },
  ];
  const stateData = [
    { id: 1, name: 'Operando' },
    { id: 2, name: 'Parado' },
  ];
  const result = calculateProductivity(stateHistory, stateData);
  expect(result).toBe('100.00');
});

// Teste para a função calculateGain
test('calculateGain should calculate gain correctly', () => {
  const equipment = {
    model: {
      hourlyEarnings: [
        { equipmentStateId: 1, value: 50 }
      ]
    },
    state: { id: 1 }
  };
  const hoursWorked = 10;
  const result = calculateGain(equipment, hoursWorked);
  expect(result).toBe('500.00');
});

// Teste para a função getStateName
test('getStateName should return correct state name', () => {
  const stateData = [
    { id: 1, name: 'Operando' },
    { id: 2, name: 'Parado' },
  ];
  const name = getStateName(1, stateData);
  expect(name).toBe('Operando');
});
