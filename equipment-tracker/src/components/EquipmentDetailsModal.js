import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EquipmentDetailsModal = ({ isOpen, onRequestClose, equipment }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (equipment) {
      import('../data/equipmentStateHistory.json').then((data) => {
        const equipmentHistory = data.default.find(item => item.equipmentId === equipment.id);
        if (equipmentHistory) {
          setHistory(equipmentHistory.states);
        }
      });
    }
  }, [equipment]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Histórico de Estados - {equipment?.name}</h2>
      <ul>
        {history.map((state, index) => (
          <li key={index}>
            {state.date} - {state.equipmentStateId}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default EquipmentDetailsModal;
