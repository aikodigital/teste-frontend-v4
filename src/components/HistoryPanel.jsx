import React from 'react';
import './HistoryPanel.css';

const HistoryPanel = ({equipamento, historico, onClose}) => {
    if (!equipamento) return null;

    return (
        <div className="history-panel">
             <button className="close-button" onClick={onClose}>×</button>
            <h2>{equipamento.name}</h2>
            <p><strong>Modelo:</strong> {equipamento.modelName}</p>
            <h4>Histórico de estados:</h4>
            <ul>
                {historico.map((item, index) => (
                    <li
                        key={index}
                        className="history-item"
                        style={{ borderLeftColor: item.cor}}
                    >
                        <div className="estado" style={{ color: item.cor }}>
                            {item.estado}
                        </div>
                        <div className="data">{item.data}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryPanel;