import React from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';

const StateHistory = ({ equipmentId, stateHistory, equipmentStates }) => {
  // Encontrar o histórico do equipamento específico
  const equipmentHistory = stateHistory.find(e => e.equipmentId === equipmentId);
  
  if (!equipmentHistory || !equipmentHistory.states || equipmentHistory.states.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Histórico de Estados</Typography>
        <Typography>Não há histórico de estados disponível para este equipamento.</Typography>
      </Paper>
    );
  }
  
  // Ordenar os estados por data (mais recente primeiro)
  const sortedStates = [...equipmentHistory.states].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Histórico de Estados
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Cor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStates.map((state, index) => {
              const stateInfo = equipmentStates.find(s => s.id === state.equipmentStateId);
              
              return (
                <TableRow key={index}>
                  <TableCell>{dayjs(state.date).format('DD/MM/YYYY HH:mm')}</TableCell>
                  <TableCell>{stateInfo ? stateInfo.name : 'Desconhecido'}</TableCell>
                  <TableCell>
                    {stateInfo && (
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          backgroundColor: stateInfo.color,
                          borderRadius: '50%'
                        }} 
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StateHistory; 