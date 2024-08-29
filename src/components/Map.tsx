import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@mantine/core';
import useEquipmentStore from '../store/useEquipmentStore';
import useData from '../hooks/useData';
import useMap from '../hooks/useMap';
import DrawerComponent from './Drawer';
import FilterDrawer from './FilterDrawer';
import '../styles/Map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faX } from '@fortawesome/free-solid-svg-icons';
import MarkerComponent from './Marker';
import { getMarkerIcon } from '../utils/utils';

const Map: React.FC = () => {
  useData();

  const { equipment, positions, models, states, history } = useEquipmentStore();

  const {
    selectedEquipmentModel,
    equipmentHistory,
    selectedEquipmentId,
    filterState,
    setFilterState,
    filterModel,
    setFilterModel,
    filteredEquipment,
    searchQuery,
    setSearchQuery,
    handleFilterButtonClick,
    filterDrawerOpened,
    setFilterDrawerOpened,
    handleViewHistory,
    drawerOpened,
    selectedEquipmentHistory,
    setDrawerOpened,
    handleResetMap,
  } = useMap({ equipment, models, history, states, positions });

  return (
    <div className="map-container">
      <div className="filter-button-container">
        <Button className="filter-button" onClick={handleFilterButtonClick}>
          <FontAwesomeIcon icon={faFilter} />
        </Button>
        <Button className="reset-button" onClick={handleResetMap}>
          <FontAwesomeIcon icon={faX} />
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
          if (selectedEquipmentId && equip.id !== selectedEquipmentId) {
            return null;
          }

          return (
            <MarkerComponent
              key={equip.id}
              equipment={equip}
              positions={positions[equip.id]}
              models={models}
              states={states}
              history={history}
              handleViewHistory={handleViewHistory}
              icon={getMarkerIcon}
              isSelected={equip.id === selectedEquipmentId}
              selectedEquipmentHistory={
                equip.id === selectedEquipmentId ? selectedEquipmentHistory : []
              }
            />
          );
        })}
      </MapContainer>

      {drawerOpened && selectedEquipmentModel && (
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
