import L from 'leaflet';
import greenMarkerUrl from '@/assets/green-marker.svg';
import redMarkerUrl from '@/assets/red-marker.svg';
import yellowMarkerUrl from '@/assets/yellow-marker.svg';
import startMarkerUrl from '@/assets/start.svg';
import markerUrl from '@/assets/marker.svg';

export const createIcon = (iconUrl: string) =>
  L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

export const MARKERS = {
  Operando: createIcon(greenMarkerUrl),
  Parado: createIcon(yellowMarkerUrl),
  Manutenção: createIcon(redMarkerUrl),
  Inicio: createIcon(startMarkerUrl),
  Marcador: createIcon(markerUrl)
};
