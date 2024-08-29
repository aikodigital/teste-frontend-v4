import React, { useState } from 'react';
import styles from './card.module.css';
import DonutChart from '../grafico/Grafico';
import caminhao from '../../assets/icons/caminhao.png';
import garra from '../../assets/icons/garra.png';
import harvester from '../../assets/icons/harvester.png';
import { useEquipmentContext } from '../../context/EquipmentContext';

const imageMap = {
  'Caminhão de carga': caminhao,
  'Garra traçadora': garra,
  Harvester: harvester,
} as { [key: string]: string };

interface Equipment {
  id: number;
  name: string;
  modelName: string;
  states: { stateName: string; date: string }[];
  hourlyEarnings: { stateName: string; value: number }[];
  positions: { lat: number; lon: number }[];
}

interface CardProps {
  data: any[];
  onLocationSelect: (coordinates: [number, number]) => void;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { setLocal } = useEquipmentContext();
  const [openStateId, setOpenStateId] = useState<number | null>(null);
  const [showAllStates, setShowAllStates] = useState(false);

  const getStateColorAndPercentage = (
    stateName: string,
  ): { color: string; percentage: number; secondaryColor?: string } => {
    //ver pra atualizar a % no gráfico
    switch (stateName) {
      case 'Operando':
        return { color: '#2ecc71', percentage: 100 };
      case 'Parado':
        return { color: '#f1c40f', percentage: 100 };
      case 'Manutenção':
        return { color: '#e74c3c', percentage: 50, secondaryColor: '#cecece' };
      default:
        return { color: '#cecece', percentage: 100 };
    }
  };

  if (data.length === 0) {
    return <p className={styles.noData}>Não encontrado.</p>;
  }

  const handleHistoryState = (id: number) => {
    setOpenStateId(id === openStateId ? null : id);
  };

  const handleToggleStates = () => {
    setShowAllStates(!showAllStates);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleLocal = (equipmentIndex: number) => {
    if (data[equipmentIndex]) {
      const positions = data[equipmentIndex].positions;

      if (positions.length > 0) {
        const lastPosition = positions[positions.length - 1];
        const lat = lastPosition.lat;
        const lon = lastPosition.lon;
        setLocal([lat, lon]);
      }
    }
  };

  return (
    <>
      {data.map((equipment, index) => {
        const lastState = equipment.states[equipment.states.length - 1];
        const { color, percentage, secondaryColor } =
          getStateColorAndPercentage(lastState.stateName);

        const modelImage = imageMap[equipment.modelName] || caminhao;

        const statesToDisplay = showAllStates
          ? equipment.states.slice().reverse()
          : equipment.states.slice(-10).reverse();

        return (
          <div key={equipment.id}>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.containerHeader}>
                  <div className={styles.nameHeader}>
                    <div
                      className={styles.name}
                      onClick={() => handleLocal(index)}
                    >
                      <div
                        className={styles.modelContainer}
                        style={{ backgroundColor: color }}
                      >
                        <img
                          src={modelImage}
                          alt={equipment.modelName}
                          className={styles.modelImg}
                        />
                      </div>
                      <h5 className={styles.equipmentName}>{equipment.name}</h5>
                    </div>
                    <DonutChart
                      percentage={percentage}
                      color={color}
                      secondaryColor={secondaryColor}
                    >
                      {equipment.averageProductivity}
                    </DonutChart>
                  </div>
                </div>
                <div className={styles.containerModel}>
                  <h5 className={styles.modelName}>{equipment.modelName}</h5>
                  <div className={styles.hourlyEarnings}>
                    <h5 className={styles.hourlyEarningsText}>
                      Produtividade diária
                    </h5>
                  </div>
                </div>
                <div className={styles.containerState}>
                  <div className={styles.contentState}>
                    <div
                      className={styles.tagState}
                      style={{ backgroundColor: color }}
                    ></div>{' '}
                    <h5>{lastState.stateName}</h5>
                  </div>
                  <button
                    className={styles.historyStateButton}
                    onClick={() => handleHistoryState(equipment.id)}
                  >
                    Histórico de estados
                  </button>
                </div>

                {openStateId === equipment.id && (
                  <div className={styles.containerStateHistory}>
                    <h5 className={styles.titleList}>Histórico de Estados</h5>
                    <ul className={styles.statesList}>
                      {statesToDisplay.map((state, index) => (
                        <li key={index} className={styles.historyState}>
                          {state.stateName}
                          {'  -  '}
                          {formatDate(state.date)}
                        </li>
                      ))}
                    </ul>
                    {equipment.states.length > 10 && (
                      <button
                        className={styles.toggleStatesButton}
                        onClick={handleToggleStates}
                      >
                        {showAllStates ? 'Mostrar Menos' : 'Mostrar Todos'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
