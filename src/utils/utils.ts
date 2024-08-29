import L from 'leaflet';
import caminhaoIcon from '../assets/icons/caminhao.svg';
import harvesterIcon from '../assets/icons/harvest.svg';
import garraIcon from '../assets/icons/garra.svg';

const icons = {
  caminhaoIcon: new L.Icon({ iconUrl: caminhaoIcon, iconSize: [50, 50] }),
  harvesterIcon: new L.Icon({ iconUrl: harvesterIcon, iconSize: [50, 50] }),
  garraIcon: new L.Icon({ iconUrl: garraIcon, iconSize: [50, 50] }),
  default: new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

export const getMarkerIcon = (modelId: string) => {
  switch (modelId) {
    case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
      return icons.caminhaoIcon;
    case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
      return icons.harvesterIcon;
    case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
      return icons.garraIcon;
    default:
      return icons.default;
  }
};

export default getMarkerIcon;
