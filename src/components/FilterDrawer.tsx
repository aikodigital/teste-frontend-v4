import { Button, Drawer, Select } from '@mantine/core';
import { EquipmentModel } from '../types/interface';

interface FilterDrawerProps {
  opened: boolean;
  onClose: () => void;
  filterState: string | null;
  setFilterState: React.Dispatch<React.SetStateAction<string | null>>;
  filterModel: string | null;
  setFilterModel: React.Dispatch<React.SetStateAction<string | null>>;
  states: Record<string, { name: string; id: string }>;
  models: EquipmentModel[];
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  opened,
  onClose,
  filterState,
  setFilterState,
  filterModel,
  setFilterModel,
  states,
  models,
}) => {
  const stateOptions = Object.values(states).map((state) => ({
    value: state.id,
    label: state.name,
  }));

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.name,
  }));

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Filtros"
      position="right"
      size="md"
      style={{ position: 'fixed', zIndex: 1300 }}
    >


      <Select
        label="Estado"
        placeholder="Selecione o estado"
        value={filterState || null }
        onChange={(value) => setFilterState(value || null)}
        data={stateOptions}
        styles={{ dropdown: { zIndex: 1400 } }}
      />
      <Select
        label="Modelo"
        placeholder="Selecione o modelo"
        value={filterModel || ''}
        onChange={(value) => setFilterModel(value || null)}
        data={modelOptions}
        styles={{ dropdown: { zIndex: 1400 } }}
      />

      <Button onClick={onClose} style={{ marginTop: '1rem' }}>
        Aplicar Filtros
      </Button>
    </Drawer>
  );
};

export default FilterDrawer;
