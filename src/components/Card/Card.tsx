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
    averageProductivity: number,
  ): {
    color: string;
    percentage: number;
    secondaryColor?: string;
  } => {
    switch (stateName) {
      case 'Operando':
        return {
          color: '#2ecc71',
          percentage: averageProductivity,
          secondaryColor: '#cecece',
        };
      case 'Parado':
        return {
          color: '#f1c40f',
          percentage: averageProductivity,
          secondaryColor: '#cecece',
        };
      case 'Manutenção':
        return {
          color: '#e74c3c',
          percentage: averageProductivity,
          secondaryColor: '#cecece',
        };
      default:
        return { color: '#cecece', percentage: 100 };
    }
  };

  if (data.length === 0) {
    return <p className={styles.noData}>Nenhum item encontrado.</p>;
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
    const formattedDate = `${day}/${month}/${year}`;

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
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
          getStateColorAndPercentage(
            lastState.stateName,
            equipment.averageProductivity,
          );

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
                      <div>
                        <h5 className={styles.equipmentName}>
                          {equipment.name}
                        </h5>
                        <h5 className={styles.modelName}>
                          {equipment.modelName}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.containerModel}>
                  <div className={styles.hourlyEarnings}>
                    <div className={styles.averageGainContainer}>
                      <h5 className={styles.averageGainValue}>
                        {equipment.averageGain}
                      </h5>
                      <h5 className={styles.averageGainText}>
                        Ganho
                        <br />
                        médio
                      </h5>
                    </div>
                    <div className={styles.hourlyEarningsContainer}>
                      <h5 className={styles.hourlyEarningsText}>
                        Produtividade média
                      </h5>
                      <DonutChart
                        percentage={percentage}
                        color={color}
                        secondaryColor={secondaryColor}
                      >
                        {equipment.averageProductivity}
                      </DonutChart>
                    </div>
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
                    <h5 className={styles.titleList}>Última atualização</h5>
                    <h5 className={styles.lastUpdate}>
                      {formatDate(
                        equipment.states[equipment.states.length - 1].date,
                      )}
                    </h5>

                    <h5 className={styles.titleList}>Histórico de Estados</h5>
                    <ul className={styles.statesList}>
                      {statesToDisplay.map((state, index) => (
                        <li key={index} className={styles.historyState}>
                          {state.stateName}
                          {'   '}
                          <br />
                          {formatDate(state.date)}
                        </li>
                      ))}
                    </ul>
                    {equipment.states.length > 10 && (
                      <button
                        className={styles.toggleStatesButton}
                        onClick={handleToggleStates}
                      >
                        {showAllStates ? 'Mostrar menos' : 'Mostrar todos'}
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
