import React, { FC, Fragment, useState, useEffect } from 'react';
import './Header.scss';

import equipmentStatesData from "../../../../data/equipmentState.json";
import equipmentModelData from "../../../../data/equipmentModel.json"

type Option = {
  id: string;
  label: string;
  value: string;
};

interface HeaderProps {
  setModel: (model: string) => void;
  setState: (state: string) => void;
  model: string;
  state: string;
}

const Header: FC<HeaderProps> = ({ setModel, setState, model, state }) => {
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const [equipmentOptions, setEquipmentOptions] = useState<Option[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');

  useEffect(() => {
    const fetchStateOptions = async () => {
      const states = equipmentStatesData.map(state => ({
        id: state.id,
        label: state.name,
        value: state.id 
      }));

      states.push({ id: 'all', label: 'Todos', value: 'all' });
      setStateOptions(states);
    };

    const fetchEquipmentOptions = async () => {
      const equipments = equipmentModelData.map(model => ({
        id: model.id,
        label: model.name,
        value: model.id 
      }));

      equipments.push({ id: 'all', label: 'Todos', value: 'all' });
      setEquipmentOptions(equipments);
    };

    fetchStateOptions();
    fetchEquipmentOptions();
  }, []);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = stateOptions.find(option => option.id === event.target.value);
    if (selectedOption) {
      setState(selectedOption.value);
      setSelectedState(selectedOption.value);
    }
  };

  const handleEquipmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = equipmentOptions.find(option => option.id === event.target.value);
    if (selectedOption) {
      setModel(selectedOption.value);
      setSelectedEquipment(selectedOption.value);
    }
  };

  return (
    <Fragment>
      <div className='header-container'>
        <div className='content-container'>
          <div className='inputs-container'>
            <label htmlFor="state-select" className='input-label'>Filtrar estado</label>
            <select id="state-select" className='text-input' value={selectedState} onChange={handleStateChange}>
              <option value="">Selecione...</option>
              {stateOptions.map(option => (
                <option key={option.id} value={option.value}> 
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='inputs-container'>
            <label htmlFor="equipment-select" className='input-label'>Filtrar equipamento</label>
            <select id="equipment-select" className='text-input' value={selectedEquipment} onChange={handleEquipmentChange}>
              <option value="">Selecione...</option>
              {equipmentOptions.map(option => (
                <option key={option.id} value={option.value}> 
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
