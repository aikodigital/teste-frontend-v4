import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useEquipmentStore from '../store/useEquipmentStore';
import { Position, StateHistory, EquipmentModel } from '../types/interface';
import DrawerComponent from './Drawer';
import { Button } from '@mantine/core';

const Map: React.FC = () => {
  const {
    equipment,
    positions,
    models,
    setEquipment,
    setPositions,
    setStates,
    setModels,
    setStateHistory,
    history,
    states,
  } = useEquipmentStore();

  const [opened, setOpened] = useState(false);
  const [selectedEquipmentModel, setSelectedEquipmentModel] = useState<EquipmentModel | null>(null);

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );
  const [equipmentHistory, setEquipmentHistory] = useState<StateHistory[]>([]);

  const handleOpenDrawer = (id: string) => {
    const equip = equipment.find((e) => e.id === id);
    if (!equip) return;
  
    const equipModel = models.find((model) => model.id === equip.equipmentModelId);
    if (!equipModel) return;

    setSelectedEquipmentId(id);
    setSelectedEquipmentModel(equipModel); // Define o modelo do equipamento selecionado
    setEquipmentHistory(
      history
        .filter((item) => item.equipmentId === id)
        .flatMap((item) => item.states)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
    setOpened(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await fetch('/data/equipment.json');
        const equipmentData = await equipmentResponse.json();
        console.log('equipment', equipmentData)
        setEquipment(equipmentData);

        const positionsResponse = await fetch(
          '/data/equipmentPositionHistory.json'
        );
        const positionsData = await positionsResponse.json();
        const positionsMap = positionsData.reduce(
          (
            acc: Record<string, Position[]>,
            item: { equipmentId: string; positions: Position[] }
          ) => {
            acc[item.equipmentId] = item.positions;
            return acc;
          },
          {}
        );
        setPositions(positionsMap);

        const statesResponse = await fetch('/data/equipmentState.json');
        const statesData = await statesResponse.json();
        const stateMap = statesData.reduce(
          (
            acc: Record<string, { id: string; name: string; color: string }>,
            state: { id: string; name: string; color: string }
          ) => {
            acc[state.id] = {
              id: state.id,
              name: state.name,
              color: state.color,
            };
            return acc;
          },
          {}
        );
        setStates(stateMap);

        const modelsResponse = await fetch('/data/equipmentModel.json');
        const modelsData = await modelsResponse.json();
        setModels(modelsData);

        const historyResponse = await fetch('/data/equipmentStateHistory.json');
        const historyData = await historyResponse.json();
        setStateHistory(historyData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, [setEquipment, setPositions, setStates, setModels, setStateHistory]);

  useEffect(() => {
    if (selectedEquipmentId) {
      setEquipmentHistory(
        history
          .filter((item) => item.equipmentId === selectedEquipmentId)
          .flatMap((item) => item.states)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      );
    }
  }, [selectedEquipmentId, history]);

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
          equipmentName={equipment.find(e => e.id === selectedEquipmentId)?.name || ''} 
          states={states}
        />
      )}
    </>
  );
};

export default Map;
