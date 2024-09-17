import React from 'react';
import L from 'leaflet';

// Função para obter ícone
export const getIcon = (model, state) => {
  let color;
  
  switch (state) {
    case 'Operando':
      color = '#00FF00'; 
      break;
    case 'Manutenção':
      color = '#FFFF00';
      break;
    case 'Parado':
      color = '#FF0000';
      break;
    default:
      color = '#0000FF';
      break;
  }

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color:${color}; color: #FFF; padding: 5px; border-radius: 50%; text-align: center;">${model ? model.name.charAt(0) : 'E'}</div>`,
    iconSize: [30, 30],
  });
};


// Função pra converter o valor para Real
export const formatCurrencyBRL = (amount) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

// Função para calcular produtividade
export const calculateProductivity = (stateHistory, stateData) => {
    if (!stateHistory || stateHistory.length === 0 || !Array.isArray(stateData)) return 0;
  
    const stateChanges = stateHistory.map(state => ({
      date: new Date(state.date).getTime(),
      stateId: state.equipmentStateId
    }));
  
    const operatingStateId = stateData.find(state => state.name === "Operando")?.id;
  
    if (!operatingStateId) return 0;
  
    let totalTime = 0;
    let operatingTime = 0;
  
    for (let i = 1; i < stateChanges.length; i++) {
      const prev = stateChanges[i - 1];
      const curr = stateChanges[i];
      const duration = (curr.date - prev.date) / (1000 * 60 * 60);
  
      if (prev.stateId === operatingStateId) {
        operatingTime += duration;
      }
      
      totalTime += duration;
    }
  
    if (stateChanges.length > 0) {
      const lastState = stateChanges[stateChanges.length - 1];
      if (lastState.stateId === operatingStateId) {
        operatingTime += (Date.now() - lastState.date) / (1000 * 60 * 60);
      }
    }
  
    return totalTime > 0 ? (operatingTime / totalTime * 100).toFixed(2) : 0;
  };
  

// Função para calcular ganho
export const calculateGain = (equipment, hoursWorked) => {
  if (!equipment.model || !equipment.model.hourlyEarnings) return 'N/A';
  const earnings = equipment.model.hourlyEarnings.find(e => e.equipmentStateId === equipment.state.id);
  return earnings ? (earnings.value * hoursWorked).toFixed(2) : 'N/A';
};

// Função para obter a cor baseada no estado
export const getStateColor = (stateName) => {
  switch (stateName) {
    case 'Operando':
      return '#00FF00';
    case 'Manutenção':
      return '#FFFF00';
    case 'Parado':
      return '#FF0000';
    default:
      return '#0000FF';
  }
};

// Função para gerar conteúdo do histórico
export const generateHistoryContent = (history, stateData) => {
  if (history.length === 0) {
    return 'Nenhum histórico disponível.';
  }

  return (
    <div className='history_main'>
      <h3>Histórico de status</h3>
      <ul className='history_main--item'>
        {history.map((state, index) => {
          const stateName = getStateName(state.equipmentStateId, stateData);
          const stateColor = getStateColor(stateName);

          return (
            <li key={index}className='history_main--itens'>
              {new Date(state.date).toLocaleString()} - <strong>Status:</strong> <span  key={index} style={{ backgroundColor: stateColor }}>{stateName}</span> 
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Função para obter o nome do estado
export const getStateName = (id, stateData) => {
  const state = stateData.find(s => s.id === id);
  return state ? state.name : 'Desconhecido';
};
