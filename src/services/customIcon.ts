import L from 'leaflet';

export const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon', 
    html: `<div style="background-color: ${color}; width: 50px; height: 50px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [50, 50], 
    iconAnchor: [25, 25], 
    popupAnchor: [0, -25], 
  });
};