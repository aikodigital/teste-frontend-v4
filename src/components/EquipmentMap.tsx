import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { LatLngTuple, Icon, DivIcon, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import MapLegend from './MapLegend';
import StateHistoryModal from './StateHistoryModal';
import { Equipment, EquipmentState } from '../types/sharedTypes';

import tracerClawIcon from '../assets/tracerClaw.svg';
import harvesterIcon from '../assets/harvester.svg';
import truckIcon from '../assets/truck.svg';

const StyledMapContainer = styled(MapContainer)({
  height: '100%',
  width: '100%',
});

interface EquipmentMapProps {
  equipments: Equipment[];
  equipmentStates: EquipmentState[];
}

const EquipmentMap: React.FC<EquipmentMapProps> = ({ equipments, equipmentStates }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const center: LatLngTuple = [-19.2, -45.9];

  const brazilBounds: LatLngBounds = new LatLngBounds([-33.7683, -73.9855], [5.2842, -34.7929]);

  const getIconForEquipment = (equipment: Equipment) => {
    let iconUrl;
    switch (equipment.model) {
      case 'Garra traçadora':
        iconUrl = tracerClawIcon;
        break;
      case 'Harvester':
        iconUrl = harvesterIcon;
        break;
      case 'Caminhão de carga':
        iconUrl = truckIcon;
        break;
      default:
        return new Icon.Default();
    }

    const state = equipmentStates.find((s) => s.id === equipment.latestState?.id);
    const color = state ? state.color : '#f1c40f';

    return new DivIcon({
      className: 'custom-icon',
      html: `
        <div style="
          width: 2rem; 
          height: 2rem; 
          background-image: url(${iconUrl}); 
          background-size: cover;
          filter: drop-shadow(0 0 0.188rem ${color}) drop-shadow(0 0 0.188rem ${color});
        "></div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  const equipmentTypes = useMemo(
    () => [
      { name: 'Garra traçadora', icon: tracerClawIcon },
      { name: 'Harvester', icon: harvesterIcon },
      { name: 'Caminhão de carga', icon: truckIcon },
    ],
    []
  );

  const handleOpenModal = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEquipment(null);
  };

  const getStateHistory = (equipment: Equipment) => {
    if (!equipment.stateHistory || !Array.isArray(equipment.stateHistory)) {
      return [];
    }
    return equipment.stateHistory.map((history) => {
      const state = equipmentStates.find((s) => s.id === history.equipmentStateId);
      return {
        date: history.date,
        stateName: state ? state.name : 'Desconhecido',
        stateColor: state ? state.color : '#000000',
      };
    });
  };

  return (
    <>
      <StyledMapContainer
        center={center}
        zoom={9}
        minZoom={4}
        maxZoom={18}
        maxBounds={brazilBounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {equipments.map((equipment) => {
          if (equipment.latestPosition) {
            return (
              <Marker
                key={equipment.id}
                position={[equipment.latestPosition.lat, equipment.latestPosition.lon]}
                icon={getIconForEquipment(equipment)}
              >
                <Popup>
                  <div>
                    <h3>{equipment.name}</h3>
                    <p>Modelo: {equipment.model}</p>
                    <p>
                      Estado:{' '}
                      <span style={{ color: equipment.latestState?.color }}>
                        {equipment.latestState?.name}
                      </span>
                    </p>
                    <p>Produtividade: {equipment.productivity.toFixed(2)}%</p>
                    <p>Ganhos: R$ {equipment.earnings.toFixed(2)}</p>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(equipment)}
                    >
                      Ver Histórico
                    </Button>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
        <MapLegend equipmentStates={equipmentStates} equipmentTypes={equipmentTypes} />
      </StyledMapContainer>
      {selectedEquipment && (
        <StateHistoryModal
          open={isModalOpen}
          onClose={handleCloseModal}
          equipmentName={selectedEquipment.name}
          stateHistory={getStateHistory(selectedEquipment)}
        />
      )}
    </>
  );
};

export default EquipmentMap;
