// EquipmentDetails.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const EquipmentDetails = ({ equipment, stateHistory, states, onClose }) => {
  if (!equipment) return null; // Adicionando verificação para evitar erro

  const history = stateHistory.find(e => e.equipmentId === equipment.id)?.states || [];

  return (
    <Dialog open={Boolean(equipment)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{equipment.name}</DialogTitle>
      <DialogContent>
        <p>Histórico de Estados:</p>
        <ul>
          {history.map((state, index) => {
            const stateName = states.find(s => s.id === state.equipmentStateId)?.name;
            return <li key={index}>{new Date(state.date).toLocaleString()}: {stateName}</li>;
          })}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipmentDetails;
