import React from 'react';
import './EquipmentStatistics.css';

function EquipmentStatistics({ equipment, stats }) {
  if (!equipment) {
    return null;
  }

  return (
    <div className="equipment-stats">
      <h3>Estatísticas - {equipment.name}</h3>
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-title">Modelo</div>
          <div className="stat-value">{equipment.model}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title">Estado Atual</div>
          <div 
            className="stat-value" 
            style={{ color: equipment.currentState?.color || '#000' }}
          >
            {equipment.currentState?.name || 'Desconhecido'}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title">Produtividade</div>
          <div className="stat-value">{stats.productivity}%</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-title">Ganho Total</div>
          <div className="stat-value">R$ {stats.earnings}</div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentStatistics;