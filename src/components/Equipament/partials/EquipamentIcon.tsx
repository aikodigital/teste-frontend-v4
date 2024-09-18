import L from 'leaflet';

const getMarkerColor = (stateId: string) => {
  switch (stateId) {
    case "operatingStateId": 
      return "#2ecc71"; 
    case "maintenanceStateId": 
      return "#f39c12"; 
    default:
      return "#e74c3c"; 
  }
};


export const createEquipmentIcon = (stateId: string) => {
  const color = getMarkerColor(stateId);
  return L.divIcon({
    className: 'equipment-icon',
    html: `<div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%;"></div>`,
  });
};
