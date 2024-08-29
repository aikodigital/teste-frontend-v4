import { Button, Drawer, Select, TextInput } from '@mantine/core';
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
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
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
  searchQuery,
  setSearchQuery,
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
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      opened={opened}
      onClose={onClose}
      title="Filtros"
      position="right"
      size="md"
      style={{ position: 'fixed', zIndex: 1300 }}
    >
      <TextInput
        label="Buscar Equipamento"
        placeholder="Digite o nome ou modelo do equipmento"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        style={{ marginBottom: '1rem' }}
      />

      <Select
        label="Estado"
        placeholder="Selecione o estado"
        value={filterState || null}
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

      <Button
        className="history-button"
        onClick={onClose}
        style={{ marginTop: '1rem' }}
      >
        Aplicar Filtros
      </Button>
    </Drawer>
  );
};

export default FilterDrawer;
