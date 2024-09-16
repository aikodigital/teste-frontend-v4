import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

interface FilterStateProps {
  onStateChange: (state: string) => void;
}

export const FilterState = ({ onStateChange }: FilterStateProps) => {
  const [state, setState] = useState('');

  const handleChange = (event: any) => {
    const newState = event.target.value as string;
    setState(newState);
    onStateChange(newState);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="Estado"
          onChange={handleChange}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Operando">Operando</MenuItem>
          <MenuItem value="Manutenção">Manutenção</MenuItem>
          <MenuItem value="Parado">Parado</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterState;