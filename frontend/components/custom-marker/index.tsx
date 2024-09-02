'use client';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Button, Text } from '@mantine/core';

const createCustomIcon = (color: string) => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="${color}">
      <path d="M12 2C8.1 2 5 5.1 5 9c0 3.9 4 9 7 13 3-4 7-9.1 7-13 0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: '',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
};

export default function CustomMarker({
  position,
  popupText,
  state,
  color,
  model,
  onShowHistory,
}: {
  position: Position;
  popupText: string;
  state: string;
  color: string;
  model: string;
  onShowHistory: () => void;
}) {
  const icon = createCustomIcon(color);

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <Text size="sm" weight={500}>
          <strong>Equipamento:</strong> {popupText}
        </Text>
        <Text size="xs" weight={500}>
          <strong>Modelo:</strong> {model}
        </Text>
        <Text size="xs" weight={500}>
          <strong>
            Status: <span style={{ color }}>{state}</span>
          </strong>
        </Text>
        <Button onClick={onShowHistory}>Ver/Esconder Histórico</Button>
      </Popup>
    </Marker>
  );
}
