import { 
  List, 
  ListItemButton,
  Typography, 
  Paper, 
  Box,
  Collapse,
  IconButton,
  styled
} from '@mui/material';
import { EquipmentWithDetails } from '../types';
import { format } from 'date-fns';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getStateName, getStateColor, getHourlyEarning } from '../services/stateService';

interface EquipmentListProps {
  equipments: EquipmentWithDetails[];
  selectedEquipment: EquipmentWithDetails | null;
  onSelectEquipment: (equipment: EquipmentWithDetails) => void;
}

const StateIndicator = styled(Box)<{ color: string }>(({ color }) => ({
  padding: '4px 12px',
  borderRadius: '16px',
  backgroundColor: color,
  color: '#ffffff',
  fontSize: '0.875rem',
  fontWeight: 500,
  display: 'inline-block',
}));

export const EquipmentList = ({ 
  equipments, 
  selectedEquipment, 
  onSelectEquipment 
}: EquipmentListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = (equipmentId: string) => {
    setExpandedId(expandedId === equipmentId ? null : equipmentId);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
      return 'Data inválida';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Paper sx={{ height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Equipamentos
      </Typography>
      <List>
        {equipments.map((equipment) => (
          <Box key={equipment.id}>
            <ListItemButton // Alterado aqui
              selected={selectedEquipment?.id === equipment.id}
              onClick={() => onSelectEquipment(equipment)}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
              <Box sx={{ 
                display: 'flex', 
                width: '100%', 
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <Box>
                  <Typography variant="subtitle1">
                    {equipment.name}
                  </Typography>
                  {equipment.model && (
                    <Typography variant="caption" color="textSecondary" display="block">
                      Modelo: {equipment.model.name}
                    </Typography>
                  )}
                  {equipment.currentState?.name !== 'Operando' && equipment.stateHistory?.length > 0 && (
                    <Typography variant="caption" color="textSecondary" display="block">
                      Última atualização: {formatDate(equipment.stateHistory[0].date)}
                    </Typography>
                  )}
                  {equipment.currentState && equipment.model && (
                    <Typography 
                      variant="caption" 
                      color={getHourlyEarning(equipment.model.id, equipment.currentState.id) >= 0 ? 'success.main' : 'error.main'}
                      display="block"
                    >
                      Ganho/hora: {formatCurrency(getHourlyEarning(equipment.model.id, equipment.currentState.id))}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {equipment.currentState && (
                    <StateIndicator color={getStateColor(equipment.currentState.id)}>
                      {getStateName(equipment.currentState.id)}
                    </StateIndicator>
                  )}
                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpand(equipment.id);
                    }}
                  >
                    {expandedId === equipment.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
              </Box>
            </ListItemButton>
            
            <Collapse in={expandedId === equipment.id}>
              <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Histórico de Estados
                </Typography>
                {equipment.stateHistory?.map((state, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1 
                    }}
                  >
                    <Box>
                      <StateIndicator color={getStateColor(state.equipmentStateId)}>
                        {getStateName(state.equipmentStateId)}
                      </StateIndicator>
                      {equipment.model && (
                        <Typography 
                          variant="caption" 
                          sx={{ ml: 1 }}
                          color={getHourlyEarning(equipment.model.id, state.equipmentStateId) >= 0 ? 'success.main' : 'error.main'}
                        >
                          {formatCurrency(getHourlyEarning(equipment.model.id, state.equipmentStateId))}/h
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="caption">
                      {formatDate(state.date)}
                    </Typography>
                  </Box>
                ))}
                {(!equipment.stateHistory || equipment.stateHistory.length === 0) && (
                  <Typography variant="body2" color="textSecondary">
                    Nenhum histórico disponível
                  </Typography>
                )}
              </Box>
            </Collapse>
          </Box>
        ))}
      </List>
    </Paper>
  );
};