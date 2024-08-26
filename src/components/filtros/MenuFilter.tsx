import styles from './menuFilter.module.css';
import filterIcon from '../../assets/icons/filter.png';
import caminhao from '../../assets/icons/caminhao.png';
import garra from '../../assets/icons/garra.png';
import harvester from '../../assets/icons/harvester.png';
import { useEquipmentContext } from '../../context/EquipmentContext';

const MenuFilter = () => {
  const { organizedData, setFilteredData, setFiltered } = useEquipmentContext();

  const handleState = (params: string) => {
    const filtered = organizedData.filter((equipment) => {
      const lastState = equipment.states[equipment.states.length - 1];
      return lastState.stateName.includes(params);
    });
    setFilteredData(filtered);
    setFiltered(true);
  };

  const handleEquipment = (params: string) => {
    const filtered = organizedData.filter((equipment) => {
      return equipment.modelName.includes(params);
    });
    setFilteredData(filtered);
    setFiltered(true);
  };

  const clearFilter = () => {
    setFilteredData(organizedData);
    setFiltered(false);
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.styleFilter} onClick={clearFilter}>
          <div className={styles.filterIcon}>
            <img src={filterIcon} />
          </div>
        </button>
      </div>

      <div className={styles.content}>
        <button
          className={styles.styleButton}
          onClick={() => handleState('Operando')}
        >
          <div className={styles.operando}></div>
        </button>
        <button
          className={styles.styleButton}
          onClick={() => handleState('Manutenção')}
        >
          <div className={styles.manutencao}></div>
        </button>
        <button
          className={styles.styleButton}
          onClick={() => handleState('Parado')}
        >
          <div className={styles.parado}></div>
        </button>

        <button
          className={styles.styleButton}
          onClick={() => handleEquipment('Caminhão de carga')}
        >
          <div className={styles.filterIcon}>
            <img src={caminhao} />
          </div>
        </button>

        <button
          className={styles.styleButton}
          onClick={() => handleEquipment('Garra traçadora')}
        >
          <div className={styles.filterIcon}>
            <img src={garra} />
          </div>
        </button>

        <button
          className={styles.styleButton}
          onClick={() => handleEquipment('Harvester')}
        >
          <div className={styles.filterIcon}>
            <img src={harvester} />
          </div>
        </button>
      </div>
    </>
  );
};

export default MenuFilter;
