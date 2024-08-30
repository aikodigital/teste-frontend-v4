'use client';

import { MapContainer as LMapContainer, TileLayer } from 'react-leaflet';
import { Marker } from './components/marker';
import { IPositions } from '../../../@types/equipment';

import 'leaflet/dist/leaflet.css';
import { useCallback, useMemo } from 'react';

interface MapProps {
  zoom?: number;
  data: Array<{
    position: IPositions;
    equipmentId: string;
  }>;
  disablePopup?: boolean;
}

const defaults = {
  zoom: 10,
};

function Map(Map: MapProps) {
  const { zoom = defaults.zoom, data, disablePopup = false } = Map;

  const calculateGeographicCenter = useCallback(
    (positions: IPositions[]) => {
      const dataLenght = data.length ?? 0;

      if (!dataLenght) {
        return {
          lat: 0,
          lng: 0,
        };
      }

      let totalLat = 0;
      let totalLon = 0;
      const positionsLenght = positions.length ?? 0;

      for (const { lat, lon } of positions) {
        totalLat += lat ?? 0;
        totalLon += lon ?? 0;
      }

      const averageLat = totalLat / positionsLenght;
      const averageLon = totalLon / positionsLenght;

      return {
        lat: averageLat,
        lng: averageLon,
      };
    },
    [data.length],
  );

  const positions = data.map(({ position }) => position);

  const center = useMemo(
    () => calculateGeographicCenter(positions),
    [positions, calculateGeographicCenter],
  );

  return (
    <LMapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data?.map((marker) => (
        <Marker
          key={marker.equipmentId}
          equipmentId={marker.equipmentId}
          position={{
            lat: marker.position?.lat ?? 0,
            lng: marker.position?.lon ?? 0,
          }}
          disablePopup={disablePopup}
        />
      ))}
    </LMapContainer>
  );
}

export default Map;
