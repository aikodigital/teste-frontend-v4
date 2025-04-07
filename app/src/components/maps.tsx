import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { IEquipmentPositionHistory } from '@/zustand/interface';
import { head, isEmpty, last, take } from 'lodash';
import LocationMarker from './location-marker';
import EquipmentMarker from './equipment-marker';
import useEquipmentStore from '@/zustand';
import { useContext, useEffect, useMemo } from 'react';
import { Context } from '@/provider';
import { MARKERS } from './create-icon';
import { Label } from './ui/label';

interface HistoryPositionMapProps {
  equipmentId: string;
}
interface MapProps {
  equipmentPositions: IEquipmentPositionHistory[];
  activeId: string;
  setActiveId: (value: string) => void;
}

const ORIGIN: [number, number] = [-19.2395, -46.0697];

export const HistoryPositionMap: React.FC<HistoryPositionMapProps> = ({
  equipmentId
}) => {
  const { equipmentPositionHistory } = useEquipmentStore();
  const { route, fetch_route } = useContext(Context);
  const selectedEquipment = equipmentPositionHistory.find(
    e => e.equipmentId === equipmentId
  );
  const pathCoordinates = useMemo<[number, number][]>(() => {
    if (!selectedEquipment || !selectedEquipment.positions) return [];
    return selectedEquipment.positions.map(pos => [pos.lat, pos.lon]);
  }, [selectedEquipment]);
  useEffect(() => {
    if (!isEmpty(pathCoordinates)) {
      const last70 = take([...pathCoordinates].reverse(), 70);
      fetch_route(last70);
    }
  }, [fetch_route, pathCoordinates]);
  const start = head(selectedEquipment?.positions);
  const end = last(selectedEquipment?.positions);
  return (
    <MapContainer
      center={head(pathCoordinates) || ORIGIN}
      zoom={10}
      scrollWheelZoom={true}
      className="h-[55vh] w-[80%] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!isEmpty(route) && (
        <Polyline positions={route} color="blue" weight={4} />
      )}
      {start && (
        <Marker position={[start.lat, start.lon]} icon={MARKERS['Inicio']}>
          <Tooltip>
            <Label>Início</Label>
          </Tooltip>
        </Marker>
      )}
      {end && (
        <Marker position={[end.lat, end.lon]} icon={MARKERS['Marcador']}>
          <Tooltip>
            <Label>Última posição do equipamento</Label>
          </Tooltip>
        </Marker>
      )}
    </MapContainer>
  );
};

export const Map: React.FC<MapProps> = ({
  activeId,
  equipmentPositions,
  setActiveId
}) => (
  <MapContainer
    center={ORIGIN}
    zoom={10}
    scrollWheelZoom={true}
    className="h-[500px] w-full rounded-lg"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {equipmentPositions.map(item => (
      <EquipmentMarker
        key={item.equipmentId}
        activeId={activeId}
        equipmentId={item.equipmentId}
        lat={last(item.positions)?.lat}
        lon={last(item.positions)?.lon}
        date={last(item.positions)?.date}
        equipmentPositions={equipmentPositions}
      />
    ))}
    <LocationMarker setActiveId={setActiveId} />
  </MapContainer>
);
