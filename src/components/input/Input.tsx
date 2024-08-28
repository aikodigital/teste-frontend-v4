import React, { useState } from 'react';
import styles from './input.module.css';
import lupa from '../../assets/icons/lupa.png';
import { useEquipmentContext } from '../../context/EquipmentContext';

interface Equipment {
  name: string;
  modelName: string;
  states: { stateName: string }[];
}

export const Input: React.FC = () => {
  const { organizedData, setResultFilter, setFilteredData, setFiltered } = useEquipmentContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (Array.isArray(organizedData)) {
      const filtered = organizedData.filter((equipment: Equipment) => {
        const nameMatch = equipment.name.toLowerCase().includes(value.toLowerCase());
        const modelNameMatch = equipment.modelName.toLowerCase().includes(value.toLowerCase());
        const stateNameMatch = equipment.states.length > 0
          ? equipment.states[equipment.states.length - 1].stateName.toLowerCase().includes(value.toLowerCase())
          : false;

        return nameMatch || modelNameMatch || stateNameMatch;
      });

      setResultFilter(filtered);
      setFilteredData(filtered); 
      setFiltered(true); 
    } else {
      console.error('organizedData não é um array ou está indefinido');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <img className={styles.lupa} src={lupa} alt="Lupa" />
        <input
          type="text"
          placeholder="Busque nome, tipo ou estado do equipamento"
          className={styles.inputNav}
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
