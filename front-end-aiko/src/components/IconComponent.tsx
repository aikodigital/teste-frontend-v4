import L from "leaflet";


import iconA from '../assets/combine-harvester.png';
import iconB from '../assets/claw.png'; 
import defaultIcon from '../assets/delivery.png';

const getCustomIcon = (modelId: string) => {
  switch (modelId) {
    case "Harvester":
      return L.icon({
        iconUrl: iconA, 
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    case "Garra traçadora":
      return L.icon({
        iconUrl: iconB, 
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    default:
      return L.icon({
        iconUrl: defaultIcon,
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
  }
};

export default getCustomIcon;
