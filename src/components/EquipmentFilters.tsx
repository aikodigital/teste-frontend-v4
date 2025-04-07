import {
  Box,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import { EquipmentDetail } from '@/types/equipment';
import { EquipmentModelEnum, EquipmentStateEnum } from '../types/equipment';;
import EquipmentCard from './EquipmentCard';

type EquipmentFilterProps = {
  setSelectedState: (e: string) => void;
  setSelectedModel: (e: string) => void;
  equipmentList: EquipmentDetail[];
  selectedModel: string;
  selectedState: string;
};

const EquipmentFilter = ({
  equipmentList,
  setSelectedState,
  setSelectedModel,
  selectedModel,
  selectedState,
}: EquipmentFilterProps) => {
  const modelOptions = Object.values(EquipmentModelEnum);
  const stateOptions = Object.values(EquipmentStateEnum);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: '#f9f9f9',
        boxShadow: 3,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        Filtrar Equipamentos
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Modelo"
          select
          fullWidth
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {modelOptions.map((model) => (
            <MenuItem key={model} value={model}>
              {model}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Estado"
          select
          fullWidth
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {stateOptions.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {equipmentList.length > 0 ? (
        <Box mt={3}>
          <Typography variant="subtitle1" gutterBottom>
            Resultados:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {equipmentList.map((eq) => (
              <Box
                key={eq.id}
                sx={{
                  flex: '1 1 calc(50% - 16px)',
                  minWidth: 250,
                }}
              >
                <EquipmentCard equipment={eq} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', marginTop: '3rem' }}
        >
          Nenhum equipamento encontrado.
        </Typography>
      )}
    </Box>
  );
};

export default EquipmentFilter;
