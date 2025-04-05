import { Icon } from 'leaflet';

export const createMarker = (color: string) =>
  new Icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path fill="${color}" d="M172.3 501.7c-145.4-211.5-172.3-232.2-172.3-309.7C0 86 86 0 192 0s192 86 192 192c0 77.5-26.9 98.2-172.3 309.7-9.5 13.8-30.8 13.8-40.4 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"/>
      </svg>
    `)}`,
    iconSize: [24, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

