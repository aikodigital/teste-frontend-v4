import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import styles from './map.module.css';
import MenuFilter from '../filtros/MenuFilter';
import { useEquipmentContext } from '../../context/EquipmentContext';

import caminhao from '../../assets/icons/caminhao.png';
import garra from '../../assets/icons/garra.png';
import harvester from '../../assets/icons/harvester.png';

const Map: React.FC = () => {
  const { local, filteredData, organizedData } = useEquipmentContext();

  const defaultLat = -19.163956;
  const defaultLon = -46.087835;

  const [position, setPosition] = useState({
    lat: defaultLat,
    lon: defaultLon,
  });
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [historyPositions, setHistoryPositions] = useState([]);

  useEffect(() => {
    if (local && local.length === 2) {
      const [lat, lon] = local;
      setPosition({ lat, lon });
    }
  }, [local]);

  useEffect(() => {
    if (selectedEquipment) {
      setHistoryPositions([]);
      setSelectedEquipment(null);
    }
  }, [filteredData, organizedData]);

  const RecenterAutomatically = ({ lat, lon }) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lon) {
        map.setView([lat, lon]);
      }
    }, [lat, lon, map]);

    return null;
  };

  const iconMapping = {
    'Caminhão de carga': caminhao,
    'Garra traçadora': garra,
    Harvester: harvester,
  };

  const defaultIconUrl =
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';

  const dataToMap = filteredData.length > 0 ? filteredData : organizedData;

  const handleHistoryPosition = (equipment) => {
    setSelectedEquipment(equipment);
    const historyPositions = equipment.positions.map((pos) => [
      pos.lat,
      pos.lon,
    ]);
    setHistoryPositions(historyPositions);

    if (historyPositions.length > 0) {
      setPosition({
        lat: historyPositions[0][0],
        lon: historyPositions[0][1],
      });
    }
  };

  const customIcon = L.divIcon({
    className: `${styles.modelContainer}`,
    html: `<div style="background-color: grey; border-radius: 50%; width: 10px; height: 10px; border: none;"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

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

  return (
    <MapContainer
      center={[position.lat, position.lon]}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        className={styles.grayscaleTile}
      />
      <MenuFilter />

      {selectedEquipment ? (
        <>
          {historyPositions.map((pos, index) => (
            <Marker key={index} position={pos} icon={customIcon} />
          ))}
          <Marker
            position={[
              selectedEquipment.positions[
                selectedEquipment.positions.length - 1
              ].lat,
              selectedEquipment.positions[
                selectedEquipment.positions.length - 1
              ].lon,
            ]}
            icon={customIcon}
          >
            <Popup>{selectedEquipment.name} - Última posição</Popup>
          </Marker>
          <Polyline
            positions={historyPositions}
            color="grey"
            dashArray="4, 4"
            weight={1}
          />
        </>
      ) : (
        dataToMap.map((item, index) => {
          const lastPosition = item.positions[item.positions.length - 1];
          const lastState = item.states[item.states.length - 1].stateName;
          const lastUpdate = item.states[item.states.length - 1].date;

          const stateClass =
            lastState === 'Operando'
              ? styles.operando
              : lastState === 'Parado'
                ? styles.parado
                : lastState === 'Manutenção'
                  ? styles.manutencao
                  : '';

          const itemIcon = L.divIcon({
            className: `${styles.modelContainer} ${stateClass}`,
            html: `<img src="${iconMapping[item.modelName] || defaultIconUrl}" class="${styles.modelImg}" />`,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          });

          return (
            <Marker
              key={index}
              position={[lastPosition.lat, lastPosition.lon]}
              icon={itemIcon}
            >
              <Popup className={styles.popup}>
                <h5 className={styles.title}>
                  {item.name} <br />
                </h5>
                <h5 className={styles.state}>{lastState}</h5>
                <h5 className={styles.state}>Última atualização</h5>
                <h5 className={styles.state}>{formatDate(lastUpdate)}</h5>
                <button
                  className={styles.positionHistory}
                  onClick={() => handleHistoryPosition(item)}
                >
                  Ver histórico de posições
                </button>
              </Popup>
            </Marker>
          );
        })
      )}

      <RecenterAutomatically lat={position.lat} lon={position.lon} />
    </MapContainer>
  );
};

export default Map;
