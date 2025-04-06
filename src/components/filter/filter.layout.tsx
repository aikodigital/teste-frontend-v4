import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { EquipmentFilters } from '~/hooks/use-equipments.hook';
import { EquipmentModel } from '~/types/equipment-model.types';
import { EquipmentState } from '~/types/equipment-state.types';
import { Button, TextField } from './filter.styles';

interface EquipmentFiltersDialogProps {
  open: boolean;
  filters: EquipmentFilters;
  model: EquipmentModel[];
  state: EquipmentState[];
  onClose: () => void;
  onChange: (key: keyof EquipmentFilters, value: string) => void;
  onClear: () => void;
}

export const EquipmentFiltersComponent = ({
  open,
  filters,
  model,
  state,
  onClose,
  onChange,
  onClear,
}: EquipmentFiltersDialogProps) => {
  const disabled = Object.values(filters).every((value) => !value);

  const renderTextField = (
    label: string,
    value: string,
    key: keyof EquipmentFilters
  ) => (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={(e) => onChange(key, e.target.value)}
      sx={{ mt: 2 }}
    />
  );

  const renderSelectField = <T extends { id: string; name: string }>(
    label: string,
    value: string,
    key: keyof EquipmentFilters,
    options: T[]
  ) => (
    <TextField
      fullWidth
      label={label}
      select
      value={value}
      onChange={(e) => onChange(key, e.target.value)}
      sx={{ mt: 2 }}
    >
      <MenuItem value=''>Todos</MenuItem>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Filtrar Equipamentos</DialogTitle>
      <DialogContent dividers>
        {renderTextField('Nome', filters.name || '', 'name')}
        {renderSelectField('Modelo', filters.model || '', 'model', model)}
        {renderSelectField('Estado', filters.state || '', 'state', state)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClear} disabled={disabled}>
          Limpar
        </Button>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};
