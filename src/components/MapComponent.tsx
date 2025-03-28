// src/components/MapComponent.tsx
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import * as L from 'leaflet'; 
import { LatLngExpression, Map as LeafletMap } from 'leaflet';
import { EquipmentData, PositionEntry } from '../types/data.types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- Fim da Configuração do Ícone ---

interface MapComponentProps {
    equipmentList: EquipmentData[];
    onSelectEquipment: (id: string) => void;
    selectedEquipmentId: string | null;
    positionHistoryTrail: PositionEntry[];
}

// Componente interno para centralizar o mapa (já usa useMap, está correto)
const MapFlyToController: React.FC<{
    equipmentList: EquipmentData[],
    selectedEquipmentId: string | null,
    positionHistoryTrail: PositionEntry[]
}> = ({ equipmentList, selectedEquipmentId, positionHistoryTrail }) => {
    const map = useMap(); // Correto!

    useEffect(() => {
        // Sua lógica de centralização aqui...
        // (Mantém como estava)
         if (selectedEquipmentId) {
            const selectedEq = equipmentList.find(eq => eq.equipment.id === selectedEquipmentId);
            if (selectedEq?.latestPosition) {
                 map.flyTo([selectedEq.latestPosition.lat, selectedEq.latestPosition.lon], 15);
            } else if (positionHistoryTrail.length > 0) {
                 const bounds = L.latLngBounds(positionHistoryTrail.map(p => [p.lat, p.lon]));
                 if (bounds.isValid()) {
                     map.flyToBounds(bounds, { padding: [50, 50] });
                 }
            }
        } else if (equipmentList.length > 0) {
            const validPositions = equipmentList
                .map(eq => eq.latestPosition)
                .filter((pos): pos is PositionEntry => !!pos)
                .map(pos => [pos.lat, pos.lon] as L.LatLngTuple);

            if (validPositions.length > 0) {
                const bounds = L.latLngBounds(validPositions);
                 if (bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [50, 50] });
                 }
            } else {
                 map.flyTo([-15.7797, -47.9297], 5);
            }
        } else {
            map.flyTo([-15.7797, -47.9297], 5);
        }
    }, [equipmentList, selectedEquipmentId, positionHistoryTrail, map]);

    return null;
};


const MapComponent: React.FC<MapComponentProps> = ({
    equipmentList,
    onSelectEquipment,
    selectedEquipmentId,
    positionHistoryTrail
}) => {
    // 1. Crie a ref com o tipo correto (LeafletMap | null)
    const mapRef = useRef<LeafletMap | null>(null);

    const trailLatLngs: LatLngExpression[] = positionHistoryTrail.map(p => [p.lat, p.lon]);

    return (
        <MapContainer
            center={[-15.7797, -47.9297]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            // 2. Passe a ref diretamente para a prop 'ref'
            ref={mapRef}
            // 3. Remova a prop 'whenCreated'
        >
            <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

             {/* Controller para centralizar/zoom (já está correto usando useMap) */}
             <MapFlyToController
                equipmentList={equipmentList}
                selectedEquipmentId={selectedEquipmentId}
                positionHistoryTrail={positionHistoryTrail}
             />

            {/* Marcadores (como estavam) */}
            {equipmentList.map(eqData => {
                if (!eqData.latestPosition) return null;
                const position: LatLngExpression = [eqData.latestPosition.lat, eqData.latestPosition.lon];
                const stateName = eqData.latestState?.state?.name ?? 'Desconhecido';
                const stateColor = eqData.latestState?.state?.color ?? '#808080';

                return (
                    <Marker
                        key={eqData.equipment.id}
                        position={position}
                        eventHandlers={{
                            click: () => {
                                onSelectEquipment(eqData.equipment.id);
                            },
                        }}
                    >
                        <Tooltip direction="top" offset={[0, -15]}>
                            {/* Tooltip content */}
                             <div className="font-semibold">{eqData.equipment.name}</div>
                            <div>
                                Estado: <span style={{ color: stateColor, fontWeight: 'bold' }}>{stateName}</span>
                            </div>
                           {eqData.latestPosition.date && (
                             <div className="text-xs text-gray-500">
                                Última posição: {format(new Date(eqData.latestPosition.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                            </div>
                           )}
                        </Tooltip>
                    </Marker>
                );
            })}

            {/* Polyline (como estava) */}
            {trailLatLngs.length > 1 && selectedEquipmentId && (
                <Polyline
                    pathOptions={{ color: 'blue', weight: 4, opacity: 0.7 }}
                    positions={trailLatLngs}
                />
            )}

        </MapContainer>
    );
};

export default MapComponent;