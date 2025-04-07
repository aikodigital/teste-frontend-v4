import { render, screen, fireEvent } from '@testing-library/react';
import EquipmentSidebar from '../components/EquipmentSidebar';
import '@testing-library/jest-dom';
import { EquipmentType } from '../utils/interface';
import React from 'react';

const mockEquipment: EquipmentType = {
    id: '1',
    name: 'Escavadeira XP',
    model: 'X-2000',
    state: { name: 'Operando', color: '#00ff00' },
    stateHistory: [
        { name: 'Operando', color: '#00ff00', date: new Date('2023-01-01T10:00:00Z') },
    ],
    positionHistory: [
        { lat: -19.1, lon: -45.9, date: new Date('2023-01-01T12:00:00Z') },
    ],
};

jest.mock('../utils/dateConverter', () => ({
    __esModule: true,
    default: (date: Date) => date.toISOString().split('T')[0],
}));

describe('EquipmentSidebar', () => {
    it('deve renderizar os dados do equipamento', () => {
        render(<EquipmentSidebar equipment={mockEquipment} onClose={jest.fn()} />);

        expect(screen.getByText('Escavadeira XP')).toBeInTheDocument();
        expect(screen.getByText(/Operando - 2023-01-01/i)).toBeInTheDocument();
        expect(screen.getByText(/Lat: -19.1, Lon: -45.9/i)).toBeInTheDocument();
    });

    it('deve chamar onClose ao clicar no botão de fechar', () => {
        const onClose = jest.fn();
        render(<EquipmentSidebar equipment={mockEquipment} onClose={onClose} />);

        const closeButton = screen.getByRole('button', { name: /✕/i });
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});