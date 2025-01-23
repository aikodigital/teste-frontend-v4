import L from 'leaflet'
import greenMarker from '../assets/icons/marker-icon-2x-green.png'
import yellowMarker from '../assets/icons/marker-icon-2x-yellow.png'
import redMarker from '../assets/icons/marker-icon-2x-red.png'
import shadowMarker from '../assets/icons/marker-shadow.png'

export const greenIcon = new L.Icon({
  iconUrl: greenMarker,
  shadowUrl: shadowMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const yellowIcon = new L.Icon({
  iconUrl: yellowMarker,
  shadowUrl: shadowMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const redIcon = new L.Icon({
  iconUrl: redMarker,
  shadowUrl: shadowMarker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
