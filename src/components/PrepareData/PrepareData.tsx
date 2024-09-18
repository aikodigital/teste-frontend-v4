import Equipement from '../../data/equipment.json';
import EquipementModel from '../../data/equipmentModel.json';
import EquipementStateHistory from '../../data/equipmentStateHistory.json';
import EquipementState from '../../data/equipmentState.json';
import { IEquipment } from '../../types/equipment';
import { useEffect, useState } from 'react';

interface EquipState {
    date: string;
    equipmentStateId: string;
}

export const prepareEquipments = (): IEquipment[] => {
    const equipements: IEquipment[] = Equipement.map(equipement => {
        const model = EquipementModel.find(model => model.id === equipement.equipmentModelId);
        const historyState = EquipementStateHistory.find(equip => equip.equipmentId === equipement.id);

        let mostRecentState: EquipState;
        if (historyState !== undefined) {
            mostRecentState = historyState.states.reduce((latest: EquipState, current: EquipState) => {
                return new Date(current.date) > new Date(latest.date) ? current : latest;
            }, historyState.states[0]);
        }

        const state = EquipementState.find(state => state.id === mostRecentState.equipmentStateId) || {
            id: '',
            name: 'Status não encontrado',
            color: '0000'
        };

        return {
            ...equipement,
            modelName: model ? model.name : '',
            hourlyEarnings: model ? model.hourlyEarnings : [],
            state: state
        };
    });

    return equipements;
};