import React from 'react';
import './StateHistoryModal.css';

function StateHistoryModal({ equipment, stateData, onClose }) {
  if (!equipment || !equipment.states) {
    return null;
  }

  // Ordenar estados do mais recente para o mais antigo
  const sortedStates = [...equipment.states].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Encontrar detalhes do estado com base no ID
  const getStateDetails = (stateId) => {
    return stateData.find(state => state.id === stateId) || {
      name: 'Desconhecido',
      color: '#ccc'
    };
  };

  // Calcular duração entre dois estados
  const calculateDuration = (currentDate, nextDate) => {
    const start = new Date(currentDate);
    const end = nextDate ? new Date(nextDate) : new Date();
    
    const diffMs = end - start;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}min`;
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Histórico de Estados - {equipment.name}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <table className="state-history-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Estado</th>
                <th>Duração</th>
              </tr>
            </thead>
            <tbody>
              {sortedStates.map((state, index) => {
                const stateDetails = getStateDetails(state.equipmentStateId);
                const nextStateDate = sortedStates[index + 1]?.date;
                
                return (
                  <tr key={index}>
                    <td>{formatDate(state.date)}</td>
                    <td>
                      <span 
                        className="state-indicator" 
                        style={{ backgroundColor: stateDetails.color }}
                      ></span>
                      {stateDetails.name}
                    </td>
                    <td>{calculateDuration(state.date, nextStateDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StateHistoryModal;