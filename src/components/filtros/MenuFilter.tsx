import React, { useState } from 'react';
import styles from './menuFilter.module.css';
import filterIcon from '../../assets/icons/filter.png';
import caminhao from '../../assets/icons/caminhao.png';
import garra from '../../assets/icons/garra.png';
import harvester from '../../assets/icons/harvester.png';
import { useEquipmentContext } from '../../context/EquipmentContext';

const MenuFilter = () => {
  const { organizedData, setFilteredData, setFiltered } = useEquipmentContext();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  const handleState = (params: string) => {
    const filtered = organizedData.filter((equipment) => {
      const lastState = equipment.states[equipment.states.length - 1];
      return lastState.stateName.includes(params);
    });
    setFilteredData(filtered);
    setFiltered(true);
    setSelectedState(params);
    setSelectedEquipment(null); 
  };

  const handleEquipment = (params: string) => {
    const filtered = organizedData.filter((equipment) => {
      return equipment.modelName.includes(params);
    });
    setFilteredData(filtered);
    setFiltered(true);
    setSelectedEquipment(params);
    setSelectedState(null); 
  };

  const clearFilter = () => {
    setFilteredData(organizedData);
    setFiltered(false);
    setSelectedState(null); 
    setSelectedEquipment(null); 
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.styleFilter} onClick={clearFilter}>
          <div className={styles.filterIcon}>
            <img src={filterIcon} alt="Filter" />
          </div>
        </button>
      </div>

      <div className={styles.content}>
        <button
          className={`${styles.styleButton} ${selectedState === 'Operando' ? styles.selected : ''}`}
          onClick={() => handleState('Operando')}
        >
          <div className={styles.operando}></div>
        </button>
        <button
          className={`${styles.styleButton} ${selectedState === 'Manutenção' ? styles.selected : ''}`}
          onClick={() => handleState('Manutenção')}
        >
          <div className={styles.manutencao}></div>
        </button>
        <button
          className={`${styles.styleButton} ${selectedState === 'Parado' ? styles.selected : ''}`}
          onClick={() => handleState('Parado')}
        >
          <div className={styles.parado}></div>
        </button>

        <button
          className={`${styles.styleButton} ${selectedEquipment === 'Caminhão de carga' ? styles.selected : ''}`}
          onClick={() => handleEquipment('Caminhão de carga')}
        >
          <div className={styles.filterIcon}>
            <img src={caminhao} alt="Caminhão de carga" />
          </div>
        </button>

        <button
          className={`${styles.styleButton} ${selectedEquipment === 'Garra traçadora' ? styles.selected : ''}`}
          onClick={() => handleEquipment('Garra traçadora')}
        >
          <div className={styles.filterIcon}>
            <img src={garra} alt="Garra traçadora" />
          </div>
        </button>

        <button
          className={`${styles.styleButton} ${selectedEquipment === 'Harvester' ? styles.selected : ''}`}
          onClick={() => handleEquipment('Harvester')}
        >
          <div className={styles.filterIcon}>
            <img src={harvester} alt="Harvester" />
          </div>
        </button>
      </div>
    </>
  );
};

export default MenuFilter;
