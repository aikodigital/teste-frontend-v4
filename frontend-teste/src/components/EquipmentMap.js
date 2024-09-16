// EquipmentMap.js
import React, { forwardRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const generateColorPalette = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors;
    colors.push(`hsl(${hue}, 100%, 50%)`);
  }
  return colors;
};

const getMarkerIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [20, 20],
    popupAnchor: [0, -10]
  });
};

const EquipmentMap = forwardRef(({ positions, equipments, states, stateHistory, onEquipmentSelect }, ref) => {
    const equipmentColorMap = useMemo(() => {
        const colors = generateColorPalette(equipments.length);
        return equipments.reduce((map, equipment, index) => {
            map[equipment.id] = colors[index];
            return map;
        }, {});
    }, [equipments]);

    return (
        <MapContainer ref={ref} center={[-19.126536, -45.947756]} zoom={13} className="map-container">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {positions.map((pos) => {
                const equipment = equipments.find(e => e.id === pos.equipmentId);
                if (!equipment) return null;

                const equipmentColor = equipmentColorMap[equipment.id];

                if (pos.positions.length === 0) return null;

                const pathCoordinates = pos.positions.map(p => [p.lat, p.lon]);
                const latestPosition = pos.positions.slice(-1)[0];
                if (!latestPosition) return null;

                const equipmentStateHistory = stateHistory?.find(s => s.equipmentId === pos.equipmentId)?.states || [];
                const latestStateId = equipmentStateHistory.length > 0 ? equipmentStateHistory[equipmentStateHistory.length - 1]?.equipmentStateId : undefined;
                const latestState = states?.find(s => s.id === latestStateId);

                return (
                    <React.Fragment key={pos.equipmentId}>
                        <Polyline positions={pathCoordinates} color={equipmentColor} />

                        <Marker
                            position={[latestPosition.lat, latestPosition.lon]}
                            icon={getMarkerIcon(equipmentColor)}
                        >
                            <Popup>
                                <strong>{equipment.name}</strong><br />
                                Estado Atual: {latestState?.name || 'Desconhecido'}
                                <br />
                                <button onClick={() => onEquipmentSelect(equipment)}>Ver Histórico Completo</button>
                            </Popup>
                            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                                <span>{equipment.name}: {latestState?.name || 'Desconhecido'}</span>
                            </Tooltip>
                        </Marker>
                    </React.Fragment>
                );
            })}
        </MapContainer>
    );
});

export default EquipmentMap;
