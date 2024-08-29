import React from 'react';
import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
  Position,
} from '../types/interface';
import { Marker, Polyline, Popup } from 'react-leaflet';
import { Button } from '@mantine/core';
import { getMarkerIcon } from '../utils/utils';
import { LatLngExpression } from 'leaflet';

interface MarkerComponentProps {
  equipment: Equipment;
  positions: Position[];
  models: EquipmentModel[];
  history: EquipmentStateHistory[];
  states: Record<string, EquipmentState>;
  handleViewHistory: (id: string) => void;
  icon: (modelId: string) => L.Icon;
  isSelected: boolean;
  selectedEquipmentHistory: Position[];
}

const MarkerComponent: React.FC<MarkerComponentProps> = ({
  positions,
  equipment,
  models,
  history,
  states,
  handleViewHistory,
  selectedEquipmentHistory,
  isSelected,
}) => {
  const lastestPosition = positions.length
    ? positions[positions.length - 1]
    : null;

  const polylinePositions: LatLngExpression[] = selectedEquipmentHistory.map(
    (pos) => [pos.lat, pos.lon]
  );

  const equipmentModel = models.find(
    (model) => model.id === equipment.equipmentModelId
  );

  const lastestStateHistory = history
    .filter((item) => item.equipmentId === equipment.id)
    .flatMap((item) => item.states)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const equipmentState = lastestStateHistory
    ? states[lastestStateHistory.equipmentStateId]
    : null;

  if (!lastestPosition || !equipmentModel) {
    return null;
  }

  return (
    <>
      <Marker
        key={equipment.id}
        position={[lastestPosition.lat, lastestPosition.lon]}
        icon={getMarkerIcon(equipment.equipmentModelId)}
      >
        <Popup>
          <div>
            <h3>{equipmentModel.name}</h3>
            <p>
              Estado: {equipmentState ? equipmentState.name : 'Desconhecido'}
            </p>
            <p>Útima posição:</p>
            <p>Latitude: {lastestPosition.lat}</p>
            <p>Longitude: {lastestPosition.lon}</p>
            <p>Data: {new Date(lastestPosition.date).toLocaleString()}</p>
            <Button
              className="history-button"
              onClick={() => handleViewHistory(equipment.id)}
            >
              Ver histórico
            </Button>
          </div>
        </Popup>
      </Marker>

      {isSelected && selectedEquipmentHistory.length > 1 && (
        <Polyline
          positions={polylinePositions}
          color="#e08057"
          weight={2}
          opacity={0.75}
          smoothFactor={8.0}
          dashArray="5, 10"
        />
      )}
    </>
  );
};

export default MarkerComponent;
