import React from 'react';
import '../styles/equipmentInfo.scss';
import { calculateProductivity, calculateEarnings } from '../utils/equipmentCalculations';

interface EquipmentInfoProps {
  equipment: any;
  currentState: any;
  model: any;
}

const EquipmentInfo: React.FC<EquipmentInfoProps> = ({ equipment, currentState, model }) => {
  // Garantir que o stateHistory exista e seja passado corretamente
  const productivity = calculateProductivity(equipment.stateHistory || []);
  const totalEarnings = calculateEarnings(equipment.stateHistory, model);

  return (
    <div className="equipment-info">
      <div className="info-header">
        <h3>{equipment.name}</h3>
        <span
          className="state-badge"
          style={{ backgroundColor: currentState.color }}
        >
          {currentState.name}
        </span>
      </div>

      <div className="info-details">
        <div className="info-item">
          <strong>Modelo:</strong> {model.name}
        </div>
        <div className="info-item">
          <strong>Ganho por Hora:</strong> 
          <span className="earnings"> {model.hourlyEarnings} unidades</span>
        </div>
        <div className="info-item">
          <strong>Produtividade:</strong>
          <span className="productivity">{productivity}%</span>
        </div>
        <div className="info-item">
          <strong>Ganho Total:</strong>
          <span className="total-earnings">{totalEarnings} unidades</span>
        </div>
      </div>
    </div>
  );
};

export default EquipmentInfo;
