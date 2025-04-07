import { render, screen } from '@testing-library/react';
import EquipmentListSection from '../components/EquipmentListSection';
import '@testing-library/jest-dom';
import React from 'react';

describe('EquipmentListSection', () => {
    it('deve exibir título e lista de itens', () => {
        render(
        <EquipmentListSection
            title="Histórico"
            items={['Item 1', 'Item 2']}
            emptyMessage="Nenhum item"
        />
        );

        expect(screen.getByText('Histórico')).toBeInTheDocument();
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('deve exibir mensagem vazia se não houver itens', () => {
        render(
        <EquipmentListSection
            title="Vazio"
            items={[]}
            emptyMessage="Sem dados"
        />
        );

        expect(screen.getByText('Vazio')).toBeInTheDocument();
        expect(screen.getByText('Sem dados')).toBeInTheDocument();
    });
});
