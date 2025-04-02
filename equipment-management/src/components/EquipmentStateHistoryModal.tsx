import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { EquipmentStateHistory } from '../interfaces/types';

interface EquipmentStateHistoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  history: EquipmentStateHistory | null;
}

const EquipmentStateHistoryModal: React.FC<EquipmentStateHistoryModalProps> = ({ isOpen, onRequestClose, history }) => {
  if (!history) return null;

  return (
    <Modal open={isOpen} onClose={onRequestClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        border: '2px solid #000', 
        boxShadow: 24, 
        p: 4 
      }}>
        <h2 id="modal-title">Equipment State History</h2>
        <button onClick={onRequestClose}>Close</button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>State ID</th>
            </tr>
          </thead>
          <tbody>
            {history.states.map((state, index) => (
              <tr key={index}>
                <td>{state.date}</td>
                <td>{state.equipmentStateId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Modal>
  );
};

export default EquipmentStateHistoryModal;
