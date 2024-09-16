import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

import { Position, Equipment } from '../../types';
import { useEquipmentData } from '../../contexts/EquipmentDataContext';
import { getEquipmentNameById, getLatestPosition, getLatestState, getStateColorById, getStateNameById } from '../../utils/getStateInfo';

// Hook para ajustar o zoom e centralizar os marcadores
const FitMapBounds: React.FC<{ bounds: L.LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && (bounds as [number, number][]).length > 0) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [50, 50] });
    }
  }, [map, bounds]);

  return null;
};

const MapComponent: React.FC<{ equipmentList: Equipment[]; selectedEquipment?: string | null }> = ({
  equipmentList,
  selectedEquipment
}) => {
  const [markers, setMarkers] = useState<JSX.Element[]>([]);
  const [polylinePositions, setPolylinePositions] = useState<Position[]>([]);
  const [bounds, setBounds] = useState<L.LatLngBoundsExpression>([]);

  const { equipmentPositions, equipmentStatesHistory, equipmentStatesInfoList, equipmentModelList } = useEquipmentData();

  useEffect(() => {
    let filteredPositions: Position[] = [];
    let latestPositions: Map<string, Position> = new Map();

    // Se houver um equipamento selecionado, pegue suas posições
    if (selectedEquipment) {
      const selectedEquipmentData = equipmentPositions.find(equipment => equipment.equipmentId === selectedEquipment);
      if (selectedEquipmentData) {
        filteredPositions = selectedEquipmentData.positions;
        setPolylinePositions(filteredPositions); // Desenha as rotas com Polyline
      }
    } else {
      // Caso contrário, pegue as posições mais recentes de todos os equipamentos
      equipmentPositions.forEach(equipment => {
        const latestPosition = getLatestPosition(equipment.positions);
        latestPositions.set(equipment.equipmentId, latestPosition);
      });
      setPolylinePositions([]);
    }

    // Criação dos ícones personalizados baseados no modelo do equipamento
    const getIconByModel = (modelId: string) => {
      const modelIconMap: { [key: string]: string } = {
        'model-1': 'https://path-to-icon1.png',
        'model-2': 'https://path-to-icon2.png',
        'model-3': 'https://path-to-icon3.png',
      };

      return L.icon({
        iconUrl: modelIconMap[modelId] || 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [20, 30],
      });
    };

    const markerPositions = (selectedEquipment ? filteredPositions : Array.from(latestPositions.values()))
      .map(position => {
        const equipmentId = selectedEquipment || equipmentPositions.find(equip => 
          equip.positions.some(pos => pos.date === position.date && pos.lat === position.lat && pos.lon === position.lon)
        )?.equipmentId;

        if (!equipmentId) return null;

        const stateId = equipmentId ? getLatestState(equipmentStatesHistory.find(equip => equip.equipmentId === equipmentId)?.states || [])?.equipmentStateId : '';
        const stateName = stateId ? getStateNameById(stateId, equipmentStatesInfoList) : 'Desconhecido';
        const stateColor = stateId ? getStateColorById(stateId, equipmentStatesInfoList) : 'gray';
        const equipmentName = getEquipmentNameById(equipmentId, equipmentList);

        // Obtém o modelo do equipamento e aplica um ícone específico
        const equipment = equipmentList.find(equip => equip.id === equipmentId);
        const equipmentModel = equipment ? equipmentModelList.find(model => model.id === equipment.equipmentModelId) : null;
        const modelIcon = equipmentModel ? getIconByModel(equipmentModel.id) : undefined;

        return {
          position: [position.lat, position.lon] as [number, number],
          marker: (
            <Marker
              key={`${equipmentId}-${position.date}`}
              position={[position.lat, position.lon]}
              icon={modelIcon} // Aplica o ícone baseado no modelo do equipamento
            >
              <Popup>
                <div>
                  <p><strong>Equipamento:</strong> {equipmentName}</p>
                  <p><strong>Data:</strong> {new Date(position.date).toLocaleString()}</p>
                  <p><strong>Estado:</strong> <span style={{ color: stateColor }}>{stateName}</span></p>
                </div>
              </Popup>
            </Marker>
          )
        };
      })
      .filter((item): item is { position: [number, number]; marker: JSX.Element } => item !== null);

    setMarkers(markerPositions.map(item => item.marker));
    setBounds(markerPositions.map(item => item.position)); // Armazena os bounds

  }, [equipmentPositions, equipmentStatesHistory, equipmentStatesInfoList, selectedEquipment, equipmentList, equipmentModelList]);

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

      {/* Ajusta o zoom e centraliza o mapa com base nos bounds */}
      {(bounds && (bounds as [number, number][]).length > 0) && <FitMapBounds bounds={bounds} />}
    </MapContainer>
  );
};

export default MapComponent;