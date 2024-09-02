import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import L from 'leaflet';

const MapView = () => {
  const { equipment, equipmentPositionHistory, equipmentState, equipmentStateHistory } = useSelector(state => state.equipment);

  // Função para obter a cor do estado atual do equipamento
  const getStateColor = (equipmentId) => {
    // Obter o histórico de estados do equipamento específico
    const stateHistory = equipmentStateHistory.find(sh => sh.equipmentId === equipmentId);
    if (!stateHistory || stateHistory.states.length === 0) return '#000'; // Cor padrão se não houver estado

    // Obter o estado mais recente
    const latestState = stateHistory.states[stateHistory.states.length - 1];
    const stateInfo = equipmentState.find(s => s.id === latestState.equipmentStateId);
    return stateInfo ? stateInfo.color : '#000';
  };

  // Função para obter a última posição de um equipamento
  const getLatestPosition = (positions) => {
    return positions.length ? positions[positions.length - 1] : null;
  };

  return (
    <MapContainer center={[-19.126536, -45.947756]} zoom={10} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {equipmentPositionHistory.map(equip => {
        const latestPosition = getLatestPosition(equip.positions);
        if (!latestPosition) return null;

        const icon = L.divIcon({
          className: 'custom-icon',
          html: `<div style="background-color: ${getStateColor(equip.equipmentId)}; width: 15px; height: 15px; border-radius: 50%;"></div>`,
        });

        const equipmentName = equipment.find(eq => eq.id === equip.equipmentId)?.name || "Desconhecido";

        return (
          <Marker key={equip.equipmentId} position={[latestPosition.lat, latestPosition.lon]} icon={icon}>
            <Popup>
              <span>{equipmentName}</span>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;
