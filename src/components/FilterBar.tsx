import {
  Box,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material'

import { useEquipment } from '@/contexts/EquipmentContext'

const FilterBar: React.FC = () => {
  const {
    states,
    models,
    statusFilter,
    setStatusFilter,
    modelFilter,
    setModelFilter,
    searchTerm,
    setSearchTerm,
  } = useEquipment()

  return (
    <Box sx={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
      <TextField
        fullWidth
        value={searchTerm}
        label="Buscar equipamento por nome"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '1rem',
            },
          },
        }}
      />
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <FormControl fullWidth>
          <InputLabel>Filtrar por Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as string)}
            label="Filtrar por Status"
            style={{ borderRadius: '1rem' }}
          >
            <MenuItem value="">Todos</MenuItem>
            {Array.from(states).map(([id, name]) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Filtrar por Modelo</InputLabel>
          <Select
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value as string)}
            label="Filtrar por Modelo"
            style={{ borderRadius: '1rem' }}
          >
            <MenuItem value="">Todos</MenuItem>
            {Array.from(models).map(([id, name]) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default FilterBar
