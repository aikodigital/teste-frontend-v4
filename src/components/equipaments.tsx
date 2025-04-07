import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new L.Icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

interface EquipmentPositionRaw {
  equipmentId: string;
  positions: Array<{
    date: string;
    lat: number;
    lon: number;
  }>;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface EquipmentStateHistoryRaw {
  equipmentId: string;
  states: Array<{
    date: string;
    equipmentStateId: string;
  }>;
}

interface EquipmentPosition {
  equipmentId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  state: string;
  timestamp: string;
}

const EquipmentMap: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [positions, setPositions] = useState<EquipmentPosition[]>([]);
  const [stateHistory, setStateHistory] = useState<EquipmentStateHistory[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [eqpRes, posRes, stateRes, historyRes] = await Promise.all([
        fetch('/data/equipment.json'),
        fetch('/data/equipmentPositionHistory.json'),
        fetch('/data/equipmentState.json'),
        fetch('/data/equipmentStateHistory.json')
      ]);

      const eqpData: Equipment[] = await eqpRes.json();
      const posDataRaw: EquipmentPositionRaw[] = await posRes.json();
      const stateData: EquipmentState[] = await stateRes.json();
      const historyDataRaw: EquipmentStateHistoryRaw[] = await historyRes.json();

      const flattenedPositions: EquipmentPosition[] = posDataRaw.flatMap(p =>
        p.positions.map(pos => ({
          equipmentId: p.equipmentId,
          latitude: pos.lat,
          longitude: pos.lon,
          timestamp: pos.date
        }))
      ).filter(p =>
        p.latitude !== undefined &&
        p.longitude !== undefined &&
        !isNaN(p.latitude) &&
        !isNaN(p.longitude)
      );

      const flattenedStateHistory: EquipmentStateHistory[] = historyDataRaw.flatMap(s =>
        s.states.map(stateEntry => {
          const stateObj = stateData.find(st => st.id === stateEntry.equipmentStateId);
          return {
            equipmentId: s.equipmentId,
            state: stateObj ? stateObj.name : 'Desconhecido',
            timestamp: stateEntry.date
          };
        })
      );

      setEquipments(eqpData);
      setPositions(flattenedPositions);
    
      setStateHistory(flattenedStateHistory);
    };

    fetchData();
  }, []);

  const getLatestPosition = (equipmentId: string): EquipmentPosition | undefined => {
    const filtered = positions.filter(p => p.equipmentId === equipmentId);
    return filtered.length > 0
      ? filtered.reduce((latest, current) => new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest, filtered[0])
      : undefined;
  };

  const getLatestState = (equipmentId: string): string => {
    const filtered = stateHistory.filter(h => h.equipmentId === equipmentId);
    return filtered.length > 0
      ? filtered.reduce((latest, current) => new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest, filtered[0]).state
      : 'Sem estado';
  };

  const getStateHistory = (equipmentId: string): EquipmentStateHistory[] => {
    return stateHistory.filter(h => h.equipmentId === equipmentId);
  };

  const getEquipmentName = (equipmentId: string): string => {
    return equipments.find(e => e.id === equipmentId)?.name || equipmentId;
  };

  const uniqueEquipments = Array.from(new Set(positions.map(p => p.equipmentId)));

  return (
  <div style={{ position: 'relative' }}>
    <MapContainer center={[-22.9, -43.2]} zoom={5} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {uniqueEquipments.map(equipmentId => {
        const pos = getLatestPosition(equipmentId);
        const state = getLatestState(equipmentId);
        const name = getEquipmentName(equipmentId);

        if (!pos) return null;

        return (
          <Marker
            key={equipmentId}
            position={[pos.latitude, pos.longitude]}
            icon={defaultIcon}
            eventHandlers={{
              click: () => setSelectedEquipment(equipmentId),
            }}
          >
            <Tooltip>{`${name} - Estado: ${state}`}</Tooltip>
            <Popup>
              <div>
                <strong>Nome:</strong> {name}<br />
                <strong>ID:</strong> {equipmentId}<br />
                <strong>Último Estado:</strong> {state}<br />
                <strong>Última Atualização:</strong> {new Date(pos.timestamp).toLocaleString()}<br />
                <button onClick={() => setSelectedEquipment(equipmentId)}>
                  Ver histórico
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>

    {selectedEquipment && (
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'white',
          padding: 20,
          border: '1px solid #ccc',
          maxHeight: '80vh',
          overflowY: 'auto',
          zIndex: 1000,
        }}
      >
        <h3>Histórico de Estados - {getEquipmentName(selectedEquipment)}</h3>
        <ul>
          {getStateHistory(selectedEquipment).map((entry, index) => (
            <li key={index}>
              {new Date(entry.timestamp).toLocaleString()} - Estado: {entry.state}
            </li>
          ))}
        </ul>
        <button onClick={() => setSelectedEquipment(null)}>Fechar</button>
      </div>
    )}
  </div>
);
};

export default EquipmentMap;
