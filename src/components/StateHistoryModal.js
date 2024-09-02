import React from 'react';
import './StateHistoryModal.css';

const StateHistoryModal = ({ stateHistory, equipment, equipmentStates, onClose }) => {
    if (!stateHistory || !equipment) return null;

    const getStateName = (stateId) => {
        const state = equipmentStates.find(s => s.id === stateId);
        return state ? state.name : 'Desconhecido';
    };

    const getStateColor = (stateId) => {
        const state = equipmentStates.find(s => s.id === stateId);
        return state ? state.color : '#000';
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Histórico de Estados - {equipment.name}</h2>
                    <button onClick={onClose} className="close-button">X</button>
                </div>
                <div className="modal-content">
                    <ul>
                        {stateHistory.states.map((state, index) => (
                            <li key={index} style={{ color: getStateColor(state.equipmentStateId) }}>
                                {new Date(state.date).toLocaleString()}: {getStateName(state.equipmentStateId)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StateHistoryModal;
