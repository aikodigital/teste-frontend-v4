import { FC } from 'react';
import { Equipment } from '../types/equipment';
import { EquipmentState } from '../types/equipmentState';
import { EquipmentStateHistoryEntry } from '../types/equipmentStateHistory';
import equipmentState from '../data/equipmentState.json';

interface EquipmentPopupProps {
    equipment: Equipment;
    state: EquipmentState;
    stateHistory: EquipmentStateHistoryEntry[];
}

const EquipmentPopup: FC<EquipmentPopupProps> = ({ equipment, state, stateHistory }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold">{equipment.name}</h3>
            <p>
                <span className="font-medium">Estado Atual:</span>{' '}
                <span style={{ color: state.color }}>{state.name}</span>
            </p>
            <h4 className="text-md font-medium my-2">Histórico de Estados:</h4>
            <ul className="list-disc list-inside max-h-[200px] overflow-y-scroll">
                {stateHistory.map((history, index) => {
                    const stateItem = equipmentState.find(s => s.id === history.equipmentStateId);
                    
                    return (
                        <li key={index}>
                            <span className="font-medium">{new Date(history.date).toLocaleString()}:</span>{' '}
                            {stateItem ? (
                                <span style={{ color: stateItem.color }}>{stateItem.name}</span>
                            ) : (
                                'Estado desconhecido'
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default EquipmentPopup;
