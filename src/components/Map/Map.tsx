import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import styles from './map.module.css';
import MenuFilter from '../filtros/MenuFilter';
import { useEquipmentContext } from '../../context/EquipmentContext';

// Importando as imagens dos ícones personalizados
import caminhao from '../../assets/icons/caminhao.png';
import garra from '../../assets/icons/garra.png';
import harvester from '../../assets/icons/harvester.png';

const Map: React.FC = () => {
  const { local, filteredData } = useEquipmentContext();

  const defaultLat = -19.163956;
  const defaultLon = -46.087835;

  const [position, setPosition] = useState({
    lat: defaultLat,
    lon: defaultLon,
  });

  useEffect(() => {
    if (local && local.length === 2) {
      const [lat, lon] = local;
      setPosition({ lat, lon });
    }
  }, [local]);

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
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png'; // URL do ícone padrão

  return (
    <MapContainer
      center={[position.lat, position.lon]}
      zoom={13}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '8px',
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        className={styles.grayscaleTile}
      />
      <MenuFilter />

      {filteredData.map((item, index) => {
        const lastPosition = item.positions[item.positions.length - 1];
        const lastState = item.states[item.states.length - 1].stateName;

        let stateClass = '';
        switch (lastState) {
          case 'Operando':
            stateClass = styles.operando;
            break;
          case 'Parado':
            stateClass = styles.parado;
            break;
          case 'Manutenção':
            stateClass = styles.manutencao;
            break;
          default:
            stateClass = ''; // Fallback or default class
        }
        console.log(item.states[item.states.length - 1].stateName);

        const customIcon = L.divIcon({
          className: `${styles.modelContainer} ${stateClass}`, // Apply the state-specific class
          html: `<img src="${iconMapping[item.modelName] || defaultIconUrl}" class="${styles.modelImg}" />`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        return (
          <Marker
            key={index}
            position={[lastPosition.lat, lastPosition.lon]}
            icon={customIcon}
          >
            <Popup className={styles.popup}>
              <h5 className={styles.title}>
                {item.name} <br />
              </h5>
              <h5 className={styles.state}>
                {item.states[item.states.length - 1].stateName}
              </h5>
            </Popup>
          </Marker>
        );
      })}

      <RecenterAutomatically lat={position.lat} lon={position.lon} />
    </MapContainer>
  );
};

export default Map;
