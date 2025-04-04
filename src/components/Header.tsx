import { 
  AppBar, 
  Toolbar, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  Box,
  SelectChangeEvent,
  styled
} from '@mui/material';
import { Equipment } from '../types';
import { useState } from 'react';

interface HeaderProps {
  equipments: Equipment[];
  onFilterChange: (searchText: string) => void;
  onEquipmentSelect: (equipmentId: string) => void;
}

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  padding: '10px 20px',
});

const SearchContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
  flexGrow: 1,
  maxWidth: '600px',
});

export const Header = ({ equipments, onFilterChange, onEquipmentSelect }: HeaderProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');

  // Remove duplicatas e ordena os equipamentos por nome

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    onFilterChange(newSearchText);
  };

  const handleEquipmentSelect = (event: SelectChangeEvent<string>) => {
    const equipmentId = event.target.value;
    setSelectedEquipment(equipmentId);
    onEquipmentSelect(equipmentId);
  };

  return (
    <AppBar position="static" color="default">
      <StyledToolbar>
        <SearchContainer>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Buscar equipamento"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Digite o nome do equipamento..."
          />
          
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="equipment-select-label">Selecionar Equipamento</InputLabel>
            <Select
              labelId="equipment-select-label"
              id="equipment-select"
              value={selectedEquipment}
              label="Selecionar Equipamento"
              onChange={handleEquipmentSelect}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {equipments.map((equipment) => (
                <MenuItem key={equipment.id} value={equipment.id}>
                  {equipment.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SearchContainer>
      </StyledToolbar>
    </AppBar>
  );
};