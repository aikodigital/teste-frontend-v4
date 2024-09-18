// src/utils/iconUtils.ts
import L from 'leaflet';

// Definir ícones para diferentes tipos de equipamento
const truckIcon = new L.Icon({
  iconUrl: '/path/to/truckIcon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const harvesterIcon = new L.Icon({
  iconUrl: '/path/to/harvesterIcon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const clawIcon = new L.Icon({
  iconUrl: '/path/to/clawIcon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const defaultIcon = new L.Icon({
  iconRetinaUrl: '/path/to/defaultIcon-2x.png',
  iconUrl: '/path/to/defaultIcon.png',
  shadowUrl: '/path/to/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Função para obter o ícone com base no modelo do equipamento
export function getIconForEquipment(equipmentModelName: string) {
  switch (equipmentModelName) {
    case 'Caminhão de carga':
      return truckIcon;
    case 'Harvester':
      return harvesterIcon;
    case 'Garra traçadora':
      return clawIcon;
    default:
      return defaultIcon;
  }
}
