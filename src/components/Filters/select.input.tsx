import React, { useState, useEffect, useContext } from 'react';
import EquipmentStateData from '../../challenge-info/data/equipmentState.json';
import MyContext from '../../context/MyContext';

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface FilterState {
  filterByCurrentState: string;
  setFilterByCurrentState: React.Dispatch<React.SetStateAction<string>>;
}

const SelectInput: React.FC = () => {
  const [currentChoice, setCurrentChoice] = useState<string>('');
  const [stateOptions, setStateOptions] = useState<EquipmentState[]>([]);
  const { filterByCurrentState, setFilterByCurrentState } = useContext(
    MyContext,
  ) as FilterState;

  useEffect(() => {
    if (stateOptions.length) return;

    const data = EquipmentStateData;
    setStateOptions(data);
  }, []);

  useEffect(() => {
    if (filterByCurrentState === currentChoice) return;

    setFilterByCurrentState(currentChoice);
  }, [currentChoice]);

  return (
    <div>
      <select
        name="status"
        id="status"
        value={currentChoice}
        onChange={(e) => setCurrentChoice(e.target.value)}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        <option value="">Todos</option>
        {stateOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
