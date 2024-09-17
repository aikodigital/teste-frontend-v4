import React from 'react';
import '../styles/map.scss';

const EquipmentDetails = ({ selectedEquipment, generateHistoryContent, onClose }) => (
  <div className="details-sidebar open">
    <span className="details-close" onClick={onClose}>&times;</span>
    <div className="details_main">
      <h2>{selectedEquipment.modelName} - {selectedEquipment.name ? selectedEquipment.name : 'Equipamento Desconhecido'}</h2>
      <p>Status Atual: {selectedEquipment.state ? selectedEquipment.state.name : 'Desconhecido'}</p>
      <div>
        {generateHistoryContent(selectedEquipment.stateHistory)}
      </div>
    </div>
  </div>
);

export default EquipmentDetails;
