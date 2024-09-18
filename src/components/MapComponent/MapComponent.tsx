import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.scss';

import { Position, Equipment } from '../../types';
import { useEquipmentData } from '../../contexts/EquipmentDataContext';
import { getEquipmentNameById, getLatestPosition, getLatestState, getStateColorById, getStateNameById } from '../../utils/getStateInfo';
import LegendComponent from './LegendComponent'; // Importa o novo componente de legenda

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
    const latestPositions: Map<string, Position> = new Map();

    if (selectedEquipment) {
      const selectedEquipmentData = equipmentPositions?.find(equipment => equipment.equipmentId === selectedEquipment);
      if (selectedEquipmentData) {
        filteredPositions = selectedEquipmentData.positions;
        setPolylinePositions(filteredPositions);
      }
    } else {
      equipmentPositions.forEach(equipment => {
        const latestPosition = getLatestPosition(equipment.positions);
        latestPositions.set(equipment.equipmentId, latestPosition);
      });
      setPolylinePositions([]);
    }

    const getIconByModel = (modelId: string) => {
      const modelClassMap: { [key: string]: string } = {
        'a3540227-2f0e-4362-9517-92f41dabbfdf': 'icon-model-1', // Caminhão de carga
        'a4b0c114-acd8-4151-9449-7d12ab9bf40f': 'icon-model-2', // Harvester
        '9c3d009e-0d42-4a6e-9036-193e9bca3199': 'icon-model-3', // Garra traçadora
      };
    
      const iconClass = modelClassMap[modelId] || 'icon-model-1';
    
      return L.divIcon({
        className: iconClass,
        html: `<div class="${iconClass}"></div>`,
        iconSize: [24, 24],
      });
    };

    const markerPositions = (selectedEquipment ? filteredPositions : Array.from(latestPositions.values()))
      .map(position => {
        const equipmentId = selectedEquipment || equipmentPositions?.find(equip =>
          equip.positions.some(pos => pos.date === position.date && pos.lat === position.lat && pos.lon === position.lon)
        )?.equipmentId;

        if (!equipmentId) return null;

        const stateId = equipmentId ? getLatestState(equipmentStatesHistory?.find(equip => equip.equipmentId === equipmentId)?.states || [])?.equipmentStateId : '';
        const stateName = stateId ? getStateNameById(stateId, equipmentStatesInfoList) : 'Desconhecido';
        const stateColor = stateId ? getStateColorById(stateId, equipmentStatesInfoList) : 'gray';
        const equipmentName = getEquipmentNameById(equipmentId, equipmentList);

        const equipment = equipmentList?.find(equip => equip.id === equipmentId);
        const equipmentModel = equipment ? equipmentModelList?.find(model => model.id === equipment.equipmentModelId) : null;
        const modelIcon = equipmentModel ? getIconByModel(equipmentModel.id) : undefined;
        const modelName = equipmentModel ? equipmentModel.name : 'Desconhecido'; // Nome do modelo

        return {
          position: [position.lat, position.lon] as [number, number],
          marker: (
            <Marker
              key={`${equipmentId}-${position.date}`}
              position={[position.lat, position.lon]}
              icon={modelIcon}
            >
              <Popup>
                <div>
                  <p><strong>Equipamento:</strong> {equipmentName}</p>
                  <p><strong>Modelo:</strong> {modelName}</p>
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
    setBounds(markerPositions.map(item => item.position));

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

      {(markers?.length > 0) && markers}

      {selectedEquipment && polylinePositions.length > 1 && (
        <Polyline
          positions={polylinePositions.map(pos => [pos.lat, pos.lon])}
          color="blue"
        />
      )}

      {(bounds && (bounds as [number, number][]).length > 0) && <FitMapBounds bounds={bounds} />}

      <LegendComponent /> {/* Adiciona o componente de legenda */}
    </MapContainer>
  );
};

export default MapComponent;