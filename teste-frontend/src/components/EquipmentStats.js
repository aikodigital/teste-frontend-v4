import React, { useMemo } from 'react';
import { 
  Paper, 
  Typography, 
  Grid,
  Box,
  LinearProgress
} from '@mui/material';
import { calculateProductivity, calculateEarnings } from '../services/api';

const EquipmentStats = ({ 
  equipmentId, 
  equipment,
  equipmentModel,
  stateHistory, 
  equipmentStates,
  equipmentModels,
  equipments
}) => {
  // Calcular produtividade
  const productivity = useMemo(() => {
    return calculateProductivity(equipmentId, stateHistory, equipmentStates);
  }, [equipmentId, stateHistory, equipmentStates]);
  
  // Calcular ganhos
  const earnings = useMemo(() => {
    return calculateEarnings(equipmentId, stateHistory, equipmentModels, equipments);
  }, [equipmentId, stateHistory, equipmentModels, equipments]);
  
  // Determinar cor com base na produtividade
  const getProductivityColor = (value) => {
    if (value >= 70) return '#2ecc71'; // Verde para alta produtividade
    if (value >= 40) return '#f1c40f'; // Amarelo para média
    return '#e74c3c'; // Vermelho para baixa
  };
  
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Estatísticas do Equipamento
      </Typography>
      
      <Grid container spacing={3}>
        {/* Dados básicos */}
        <Grid xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            Informações Básicas
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Nome:</strong> {equipment ? equipment.name : 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Modelo:</strong> {equipmentModel ? equipmentModel.name : 'N/A'}
            </Typography>
          </Box>
        </Grid>
        
        {/* Produtividade */}
        <Grid xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            Produtividade (últimas 24h)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={productivity} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: '#ecf0f1',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getProductivityColor(productivity)
                  }
                }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">
                {`${Math.round(productivity)}%`}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        {/* Ganhos */}
        <Grid xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Ganhos Totais
          </Typography>
          <Typography variant="h4" sx={{ 
            color: earnings >= 0 ? '#2ecc71' : '#e74c3c',
            fontWeight: 'bold'
          }}>
            {earnings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EquipmentStats; 