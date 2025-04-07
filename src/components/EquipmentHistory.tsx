import { EquipmentDetail } from '@/types/equipment';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Avatar,
} from '@mui/material';
import { Close, LocalShipping, Agriculture, Build } from '@mui/icons-material';
import EquipmentStateCard from './EquipmentStateCard';

type EquipmentHistoryProps = {
  equipment: EquipmentDetail;
  onClose: () => void;
};

const getModelIcon = (modelName: string) => {
  if (modelName.includes('Caminhão')) {
    return <LocalShipping fontSize="large" />;
  } else if (modelName.includes('Harvester')) {
    return <Agriculture fontSize="large" />;
  } else {
    return <Build fontSize="large" />;
  }
};

const EquipmentHistory = ({ equipment, onClose }: EquipmentHistoryProps) => {  
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ position: 'relative', textAlign: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Histórico do Equipamento
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 0, top: 0 }}
          aria-label="Fechar"
        >
          <Close />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
        <Avatar  sx={{ width: 56, height: 56, bgcolor: 'primary.light' }}>
          {getModelIcon(equipment.model.name)}
        </Avatar>
      </Box>
      <Typography variant="subtitle1" gutterBottom sx={{textAlign: 'center'}}>
        {equipment.name} - {equipment.model.name} 
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
      {equipment.stateHistory?.length ? (
        equipment.stateHistory.map((state, index) => (
          <EquipmentStateCard
            key={index}
            stateName={state.name}
            date={state.date}
          />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          Nenhum histórico disponível.
        </Typography>
      )}
      </Box>
    </Paper>
  );
};

export default EquipmentHistory;
