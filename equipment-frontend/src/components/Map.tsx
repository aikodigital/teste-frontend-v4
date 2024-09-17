import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EquipmentPosition, EquipmentStateHistory } from '../types/equipmentPositionHistory';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json'; // Importar JSON diretamente
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';
import EquipmentHistoryModal from './EquipmentHistoryModal'; // Importar o modal

interface EquipmentStateDetail {
  date: string;
  state: string;
}

const MapComponent: React.FC = () => {
  const [positions, setPositions] = useState<EquipmentPosition[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [history, setHistory] = useState<EquipmentStateDetail[]>([]);

  useEffect(() => {
    // Utilizando import em vez de fetch
    const latestPositions = equipmentPositionHistory.map((equipment) => {
      const lastPosition = equipment.positions[equipment.positions.length - 1];
      return {
        equipmentId: equipment.equipmentId,
        lat: lastPosition.lat,
        lon: lastPosition.lon,
      };
    });
    setPositions(latestPositions);
  }, []);

  const openModal = (equipmentId: string) => {
    setSelectedEquipment(equipmentId);

    const equipmentStateHistoryTyped = equipmentStateHistory as EquipmentStateHistory[];

    const equipmentHistory = equipmentStateHistoryTyped.find((item) => item.equipmentId === equipmentId);
    if (equipmentHistory) {
      const formattedHistory: EquipmentStateDetail[] = equipmentHistory.states.map(state => ({
        date: state.date,
        state: equipmentState.find(e => e.id === state.equipmentStateId)?.name || 'Desconhecido' // Ajuste para equipmentStateId
      }));
      setHistory(formattedHistory);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <>
      <MapContainer center={[-19.126536, -45.947756]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map((pos) => (
          <Marker
            key={pos.equipmentId}
            position={[pos.lat, pos.lon]}
            icon={L.icon({
              iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
              iconSize: [38, 38],
              iconAnchor: [19, 38],
            })}
            eventHandlers={{
              click: () => openModal(pos.equipmentId),
            }}
          >
            <Popup>
              Equipamento ID: {pos.equipmentId}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedEquipment && (
        <EquipmentHistoryModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          equipmentId={selectedEquipment}
          history={history}
        />
      )}
    </>
  );
};

export default MapComponent;
