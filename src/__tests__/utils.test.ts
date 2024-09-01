import { calculateTotalEarnings, formatDate, getStateById } from '../utils/utils';

describe('Utils functions', () => {
    test('calculateTotalEarnings should calculate earnings correctly', () => {
        const mockModelEquipmentId = 'a3540227-2f0e-4362-9517-92f41dabbfdf';
        const mockEquipmentId = 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9';
        
        const result = calculateTotalEarnings(mockModelEquipmentId, mockEquipmentId);
        
        expect(result).toBeGreaterThan(0);
    });

    test('formatDate should format the date correctly', () => {
        const isoDate = '2024-08-31T12:34:56Z';
        const formattedDate = formatDate(isoDate);
        expect(formattedDate).toBe('31/08/2024, 09:34:56');
    });

    test('getStateById should return the correct state name', () => {
        const mockId = '0808344c-454b-4c36-89e8-d7687e692d57';
        const stateName = getStateById(mockId);
        expect(stateName).toBe('Operando');
    });

    test('getStateById should return "Desconhecido" for an invalid id', () => {
        const invalidId = 'invalid';
        const stateName = getStateById(invalidId);
        expect(stateName).toBe('Desconhecido');
    });
});
