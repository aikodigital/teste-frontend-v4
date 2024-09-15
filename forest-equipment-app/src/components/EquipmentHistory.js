import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EquipmentHistory = ({ equipmentId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('./data/equipmentStateHistory.json')
      .then(response => {
        const equipmentData = response.data.find(e => e.equipmentId === equipmentId);
  
        if (equipmentData) {
          setHistory(equipmentData.states);
        } else {
          console.error('Equipamento não encontrado');
          // Exibir uma mensagem de erro ao usuário
        }
      })
      .catch(error => {
        console.error('Erro ao buscar histórico de estados:', error);
        // Exibir uma mensagem de erro ao usuário
      });
  }, [equipmentId]);

return (
  
  <div>
    <h3>Histórico de Estados</h3>
    {history.length > 0 ? (
      <ul>
        {history.map((state, index) => (
          <li key={state.id}>
            {new Date(state.date).toLocaleString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}: Estado ID {state.equipmentStateId}
          </li>
        ))}
      </ul>
    ) : (
      <p>Nenhum histórico encontrado.</p>
    )}
  </div>
);
 
};

export default EquipmentHistory;
