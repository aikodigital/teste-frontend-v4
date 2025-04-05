import { MenuItem } from '@mui/material';
import { EquipmentFilters } from '~/hooks/use-equipments.hook';
import { EquipmentModel } from '~/types/equipment-model.types';
import { EquipmentState } from '~/types/equipment-state.types';
import { FiltersWrapper, StyledButton, StyledTextField } from './filter.styles';

interface EquipmentFiltersProperties {
  filters: EquipmentFilters;
  model: EquipmentModel[];
  state: EquipmentState[];
  onChange: (key: keyof EquipmentFilters, value: string) => void;
  onClear: () => void;
}

export const EquipmentFiltersComponent = ({
  filters,
  model,
  state,
  onChange,
  onClear,
}: EquipmentFiltersProperties) => {
  return (
    <FiltersWrapper>
      <StyledTextField
        label='Nome'
        value={filters.name || ''}
        onChange={(e) => onChange('name', e.target.value)}
      />

      <StyledTextField
        label='Modelo'
        select
        value={filters.model || ''}
        onChange={(e) => onChange('model', e.target.value)}
      >
        <MenuItem value=''>Todos</MenuItem>
        {model.map((m) => (
          <MenuItem key={m.id} value={m.name}>
            {m.name}
          </MenuItem>
        ))}
      </StyledTextField>

      <StyledTextField
        label='Estado'
        select
        value={filters.state || ''}
        onChange={(e) => onChange('state', e.target.value)}
      >
        <MenuItem value=''>Todos</MenuItem>
        {state.map((s) => (
          <MenuItem key={s.id} value={s.name}>
            {s.name}
          </MenuItem>
        ))}
      </StyledTextField>

      <StyledButton onClick={onClear}>Limpar</StyledButton>
    </FiltersWrapper>
  );
};
