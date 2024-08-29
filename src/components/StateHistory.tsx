import { FC, useState } from 'react';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';
import { EquipmentStateHistory } from '../types/equipmentStateHistory';
import { EquipmentState } from '../types/equipmentState';

interface StateHistoryProps {
    equipmentId: string;
}

const StateHistory: FC<StateHistoryProps> = ({ equipmentId }) => {
    const [showHistory, setShowHistory] = useState(false);
    const history = equipmentStateHistory.find(h => h.equipmentId === equipmentId) as EquipmentStateHistory;

    const toggleHistory = () => setShowHistory(!showHistory);

    return (
        <div>
            <button className="text-blue-500" onClick={toggleHistory}>
                {showHistory ? 'Ocultar Histórico' : 'Ver Histórico'}
            </button>
            {showHistory && (
                <ul className="mt-2">
                    {history.states.map((stateHistory, index) => {
                        const state = equipmentState.find(s => s.id === stateHistory.equipmentStateId) as EquipmentState;
                        return (
                            <li key={index} className="mb-1">
                                <span className="font-semibold">{new Date(stateHistory.date).toLocaleString()}:</span>
                                <span style={{ color: state.color }}> {state.name}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default StateHistory;
