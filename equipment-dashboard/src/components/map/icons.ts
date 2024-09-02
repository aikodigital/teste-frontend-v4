import L from 'leaflet';
import MarkerIcon from '../../assets/icons/icon-marker.png';
import truck from '../../assets/icons/caminhao-de-carga-icon.png';
import harvester from '../../assets/icons/harvester-icon.png';
import tracerClaw from '../../assets/icons/garra-tracadora-icon.png';

export const customIcon = new L.Icon({
    iconUrl: MarkerIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

export const iconMapping: { [key: string]: L.Icon } = {
    "Caminhão de carga": new L.Icon({
        iconUrl: truck,
        iconSize: [45, 60],
        iconAnchor: [23, 55],
        popupAnchor: [0, -40],
    }),
    "Harvester": new L.Icon({
        iconUrl: harvester,
        iconSize: [45, 60],
        iconAnchor: [23, 55],
        popupAnchor: [0, -40],
    }),
    "Garra traçadora": new L.Icon({
        iconUrl: tracerClaw,
        iconSize: [45, 60],
        iconAnchor: [23, 55],
        popupAnchor: [0, -40],
    }),
};
