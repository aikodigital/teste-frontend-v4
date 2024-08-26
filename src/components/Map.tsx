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

const Map: React.FC = () => {
  useData();

  const { equipment, positions, models, states, history } = useEquipmentStore();

  const {
    opened,
    selectedEquipmentModel,
    equipmentHistory,
    selectedEquipmentId,
    handleOpenDrawer,
    setOpened,
  } = useMap({
    equipment,
    models,
    history,
  });

  return (
    <>
      <MapContainer
        center={[-19.126536, -45.947756]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {equipment.map((equip) => {
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
              icon={
                new L.Icon({
                  iconUrl:
                    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                })
              }
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
                  <Button onClick={() => handleOpenDrawer(equip.id)}>
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
          opened={opened}
          onClose={() => setOpened(false)}
          equipmentHistory={equipmentHistory}
          equipmentModel={selectedEquipmentModel}
          equipmentName={
            equipment.find((e) => e.id === selectedEquipmentId)?.name || ''
          }
          states={states}
        />
      )}
    </>
  );
};

export default Map;
