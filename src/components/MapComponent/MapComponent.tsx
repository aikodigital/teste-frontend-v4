import React, { useEffect, useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

import { Position, Equipment } from '../../types';

import { getEquipmentNameById, getLatestPosition, getLatestState, getStateColorById, getStateNameById } from '../../utils/getStateInfo';
import { equipmentStatesHistory, equipmentStatesInfoList, equipmentPositionsList } from '../../utils/sharedData';

interface MapComponentProps {
  equipmentList: Equipment[];
  selectedEquipment?: string | null;
}

const MapComponent: React.FC<MapComponentProps> = ({
  equipmentList,
  selectedEquipment
}) => {
  const [markers, setMarkers] = useState<JSX.Element[]>([]);
  const [polylinePositions, setPolylinePositions] = useState<Position[]>([]);

  useEffect(() => {
    let filteredPositions: Position[] = [];
    let latestPositions: Map<string, Position> = new Map();

    // Se houver um equipamento selecionado, pegue suas posições
    if (selectedEquipment) {
      const selectedEquipmentData = equipmentPositionsList.find(equipment => equipment.equipmentId === selectedEquipment);
      if (selectedEquipmentData) {
        filteredPositions = selectedEquipmentData.positions;
        setPolylinePositions(filteredPositions); // Desenha as rotas com Polyline
      }
    } else {
      // Caso contrário, pegue as posições mais recentes de todos os equipamentos
      equipmentPositionsList.forEach(equipment => {
        const latestPosition = getLatestPosition(equipment.positions);
        latestPositions.set(equipment.equipmentId, latestPosition);
      });
      setPolylinePositions([]);
    }

    const markers = (selectedEquipment ? filteredPositions : Array.from(latestPositions.values()))
      .map(position => {
        const equipmentId = selectedEquipment || equipmentPositionsList.find(equip => 
          equip.positions.some(pos => pos.date === position.date && pos.lat === position.lat && pos.lon === position.lon)
        )?.equipmentId;

        if (!equipmentId) return null;

        const stateId = equipmentId ? getLatestState(equipmentStatesHistory.find(equip => equip.equipmentId === equipmentId)?.states || [])?.equipmentStateId : '';
        const stateName = stateId ? getStateNameById(stateId, equipmentStatesInfoList) : 'Desconhecido';
        const stateColor = stateId ? getStateColorById(stateId, equipmentStatesInfoList) : 'gray';
        const equipmentName = getEquipmentNameById(equipmentId, equipmentList);

        return (
          <Marker
            key={`${equipmentId}-${position.date}`}
            position={[position.lat, position.lon]}
            icon={L.icon({ 
              iconUrl: `https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png`, 
              iconSize: [20, 30] 
            })}
          >
            <Popup>
              <div>
                <p><strong>Equipamento:</strong> {equipmentName}</p>
                <p><strong>Data:</strong> {new Date(position.date).toLocaleString()}</p>
                <p><strong>Estado:</strong> <span style={{ color: stateColor }}>{stateName}</span></p>
              </div>
            </Popup>
          </Marker>
        );
      })
      .filter((marker): marker is JSX.Element => marker !== null);

    setMarkers(markers);
  }, [equipmentPositionsList, equipmentStatesHistory, equipmentStatesInfoList, selectedEquipment, equipmentList]);

  return (
    <MapContainer 
      center={[-19.2, -45.95]} 
      zoom={13}
      className='map-container'
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
      
      {selectedEquipment && polylinePositions.length > 1 && (
        <Polyline 
          positions={polylinePositions.map(pos => [pos.lat, pos.lon])}
          color="blue"
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;