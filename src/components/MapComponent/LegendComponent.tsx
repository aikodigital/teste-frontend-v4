import React from 'react';
import './MapComponent.scss';

const LegendComponent: React.FC = () => {
  return (
    <div className="legend-container">
      <h5>Legenda dos Modelos</h5>
      <div className="legend-item">
        <div className="icon icon-model-1"></div>
        <span>Caminhão de carga</span>
      </div>
      <div className="legend-item">
        <div className="icon icon-model-2"></div>
        <span>Harvester</span>
      </div>
      <div className="legend-item">
        <div className="icon icon-model-3"></div>
        <span>Garra traçadora</span>
      </div>
    </div>
  );
};

export default LegendComponent;