import { EquipmentState } from './EquipmentState.interface';

export interface FilterState {
  search: string;
  filterByCurrentState: string;
  stateOptions: EquipmentState[];
  setStateOptions: React.Dispatch<React.SetStateAction<EquipmentState[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFilterByCurrentState: React.Dispatch<React.SetStateAction<string>>;
}
