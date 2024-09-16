import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuração do ícone padrão do Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const EquipmentMap = ({ equipmentPositions }) => {
  useEffect(() => {
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null; // Esta linha previne múltiplas inicializações
    }

    const map = L.map('map').setView([-19.126536, -45.947756], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    equipmentPositions.forEach((equipment) => {
      const { lat, lon, name } = equipment;

      L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${name}</b>`)
        .openPopup();
    });
  }, [equipmentPositions]);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default EquipmentMap;
