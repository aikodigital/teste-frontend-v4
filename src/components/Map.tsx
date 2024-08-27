// Map.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@mantine/core';
import useEquipmentStore from '../store/useEquipmentStore';
import useData from '../hooks/useData';
import useMap from '../hooks/useMap';
import DrawerComponent from './Drawer';
import FilterDrawer from './FilterDrawer';
import caminhaoIcon from '../assets/icons/caminhao.svg';
import harvesterIcon from '../assets/icons/harvest.svg';
import garraIcon from '../assets/icons/garra.svg';
import '../styles/Map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const icons = {
  caminhaoIcon: new L.Icon({ iconUrl: caminhaoIcon, iconSize: [50, 50] }),
  harvesterIcon: new L.Icon({ iconUrl: harvesterIcon, iconSize: [50, 50] }),
  garraIcon: new L.Icon({ iconUrl: garraIcon, iconSize: [50, 50] }),
  default: new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

const Map: React.FC = () => {
  useData();

  const { equipment, positions, models, states, history } = useEquipmentStore();

  const {
    selectedEquipmentModel,
    equipmentHistory,
    selectedEquipmentId,
    handleOpenDrawer,
    filterState,
    setFilterState,
    filterModel,
    setFilterModel,
    filteredEquipment,
    searchQuery,
    setSearchQuery,
  } = useMap({ equipment, models, history, states, positions });

  const [filterDrawerOpened, setFilterDrawerOpened] = React.useState(false);
  const [drawerOpened, setDrawerOpened] = React.useState(false);

  const handleFilterButtonClick = () => {
    setDrawerOpened(false);
    setTimeout(() => setFilterDrawerOpened(true), 300);
  };

  const handleViewHistory = (id: string) => {
    setFilterDrawerOpened(false);
    setTimeout(() => {
      handleOpenDrawer(id);
      setDrawerOpened(true);
    }, 300);
  };

  const getMarkerIcon = (modelId: string) => {
    switch (modelId) {
      case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
        return icons['caminhaoIcon'];
      case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
        return icons['harvesterIcon'];
      case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
        return icons['garraIcon'];
      default:
        return icons['default'];
    }
  };

  return (
    <div className="map-container">
      <div className="filter-button-container">
        <Button className="filter-button" onClick={handleFilterButtonClick}>
          <FontAwesomeIcon icon={faFilter} />
        </Button>
      </div>
      <FilterDrawer
        opened={filterDrawerOpened}
        onClose={() => setFilterDrawerOpened(false)}
        filterState={filterState}
        setFilterState={setFilterState}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        states={states}
        models={models}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MapContainer
        center={[-19.126536, -45.947756]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {filteredEquipment.map((equip) => {
          const pos = positions[equip.id];
          const latestPosition = pos ? pos[pos.length - 1] : null;
          const equipmentModel = models.find(
            (model) => model.id === equip.equipmentModelId
          );

          const latestStateHistory = history
            .filter((item) => item.equipmentId === equip.id)
            .flatMap((item) => item.states)
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )[0];

          const equipmentState = latestStateHistory
            ? states[latestStateHistory.equipmentStateId]
            : null;

          if (!latestPosition || !equipmentModel) {
            return null;
          }

          return (
            <Marker
              key={equip.id}
              position={[latestPosition.lat, latestPosition.lon]}
              icon={getMarkerIcon(equip.equipmentModelId)}
            >
              <Popup>
                <div>
                  <h3>{equipmentModel?.name}</h3>
                  <p>
                    Estado:{' '}
                    {equipmentState ? equipmentState.name : 'Desconhecido'}
                  </p>
                  <p>Última posição:</p>
                  <p>Lat: {latestPosition.lat}</p>
                  <p>Lon: {latestPosition.lon}</p>
                  <p>Data: {new Date(latestPosition.date).toLocaleString()}</p>
                  <Button
                    className="history-button"
                    onClick={() => handleViewHistory(equip.id)}
                  >
                    Ver histórico
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {selectedEquipmentModel && (
        <DrawerComponent
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          equipmentHistory={equipmentHistory}
          equipmentModel={selectedEquipmentModel}
          equipmentName={
            equipment.find((e) => e.id === selectedEquipmentId)?.name || ''
          }
          states={states}
        />
      )}
    </div>
  );
};

export default Map;
