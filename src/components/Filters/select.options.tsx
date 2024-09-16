import FilterButton from './Filter.Button';
import MyContext from '../../context/MyContext';
import React, { useState, useEffect, useContext } from 'react';
import { FilterState } from '../../interfaces/FilterState.interface';
import { EquipmentState } from '../../interfaces/EquipmentState.interface';
import EquipmentStateData from '../../challenge-info/data/equipmentState.json';

const SelectOptions: React.FC = () => {
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
    <div className="flex-col space-x-2 justify-center my-10">
      <h1>Selecione o estado do equipamento</h1>
      {stateOptions.map((option) => (
        <FilterButton
          key={option.id}
          currentId={option.id}
          currentChoice={currentChoice}
          setCurrentChoice={setCurrentChoice}
          active={currentChoice === option.id}
        >
          {option.name}
        </FilterButton>
      ))}
    </div>
  );
};

export default SelectOptions;
