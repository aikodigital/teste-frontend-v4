import { LatLngExpression } from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, ZoomControl, Polyline } from 'react-leaflet';
import { getEquipmentData, getEquipmentPositionHistory } from '../services/equipmentService';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Ícones personalizados
import truckIconUrl from '../assets/img/truck-icon.png';
import harvesterIconUrl from '../assets/img/harvester-icon.png';
import defaultIconUrl from '../assets/img/marker-icon.png';

const truckIcon = new L.Icon({
  iconUrl: truckIconUrl,
  iconSize: [40, 50],
  iconAnchor: [20, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const harvesterIcon = new L.Icon({
  iconUrl: harvesterIconUrl,
  iconSize: [40, 50],
  iconAnchor: [20, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultIcon = new L.Icon({
  iconUrl: defaultIconUrl,
  iconSize: [40, 50],
  iconAnchor: [20, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const getIconForEquipment = (equipmentModelName: string) => {
  switch (equipmentModelName) {
    case 'Caminhão de carga':
      return truckIcon;
    case 'Harvester':
      return harvesterIcon;
    default:
      return defaultIcon;
  }
};

interface EquipmentMapProps {
  selectedEquipment: string | null;
  filter: string;
  getCurrentState: (equipmentId: string) => any;
  getEquipmentModel: (equipmentModelId: string, equipmentStateId: string) => any;
  onDeselectEquipment: () => void;
}

const EquipmentMap: React.FC<EquipmentMapProps> = ({
  selectedEquipment,
  filter,
  getCurrentState,
  getEquipmentModel,
  onDeselectEquipment,
}) => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const markerRefs = useRef<any>({});

  const defaultCenter: LatLngExpression = [-19.126536, -45.947756];
  const defaultZoom = 13;

  useEffect(() => {
    setEquipment(getEquipmentData());
    setPositions(getEquipmentPositionHistory());
  }, []);

  const getLatestPosition = (equipmentId: string) => {
    const equipmentPositions = positions.find((position: any) => position.equipmentId === equipmentId);
    if (!equipmentPositions || equipmentPositions.positions.length === 0) {
      return null;
    }
    return equipmentPositions.positions[equipmentPositions.positions.length - 1];
  };

  const MapController = () => {
    const map = useMapEvents({
      click() {
        onDeselectEquipment();
      },
    });

    useEffect(() => {
      if (filter !== 'Todos') {
        const filteredEquipmentPositions = equipment
          .filter((equip) => {
            const currentState = getCurrentState(equip.id);
            return filter === 'Todos' || currentState.name === filter;
          })
          .map((equip) => getLatestPosition(equip.id))
          .filter((pos) => pos);

        if (filteredEquipmentPositions.length > 0) {
          const bounds = L.latLngBounds(filteredEquipmentPositions.map((pos) => [pos.lat, pos.lon]));
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }, [filter, equipment, map]);

    useEffect(() => {
      if (selectedEquipment) {
        const selectedPosition = getLatestPosition(selectedEquipment);
        if (selectedPosition) {
          const { lat, lon } = selectedPosition;
          map.setView([lat, lon], 15);
          const marker = markerRefs.current[selectedEquipment];
          if (marker) {
            marker.openPopup();
          }
        }
      }
    }, [selectedEquipment, map]);

    return null;
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapController />
      <ZoomControl position="topright" />

      {equipment
        .filter((equip) => {
          const currentState = getCurrentState(equip.id);
          return filter === 'Todos' || currentState.name === filter;
        })
        .map((equip) => {
          const latestPosition = getLatestPosition(equip.id);
          if (!latestPosition) return null;

          const currentState = getCurrentState(equip.id);
          const equipmentModel = getEquipmentModel(equip.equipmentModelId, currentState.id);

          return (
            <Marker
              key={equip.id}
              position={[latestPosition.lat, latestPosition.lon]}
              icon={getIconForEquipment(equipmentModel.name)}
              ref={(el) => (markerRefs.current[equip.id] = el)}
            >
              <Popup>
                <strong>{equip.name}</strong>
                <br />
                Modelo: {equipmentModel.name}
                <br />
                Estado: <span style={{ color: currentState.color }}>{currentState.name}</span>
                <br />
                Ganho por hora: {equipmentModel.hourlyEarnings} unidades
              </Popup>

              {selectedEquipment === equip.id && (
                <Polyline
                  positions={positions
                    .find((pos: any) => pos.equipmentId === equip.id)
                    ?.positions.map((pos: any) => [pos.lat, pos.lon]) || []}
                  color="blue"
                />
              )}
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default EquipmentMap;
