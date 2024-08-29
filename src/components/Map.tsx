import { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipment from '../data/equipment.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import EquipmentPopup from './EquipmentPopup';
import { Equipment } from '../types/equipment';
import { EquipmentPositionHistory } from '../types/equipmentPositionHistory';
import { EquipmentState } from '../types/equipmentState';
import { EquipmentStateHistory } from '../types/equipmentStateHistory';

// SVG do ícone
const svgIcon = L.divIcon({
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="#e74c3c" d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zM12 11c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
        </svg>
    `,
    className: '', // Use uma classe vazia ou adicione sua própria
    iconSize: [24, 24], // Tamanho do ícone
    iconAnchor: [12, 24], // Âncora do ícone
});

const getLatestState = (equipmentId: string): EquipmentState | undefined => {
    const history = equipmentStateHistory.find(h => h.equipmentId === equipmentId);
    if (!history) return undefined;

    const latestStateEntry = history.states.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return equipmentState.find(state => state.id === latestStateEntry.equipmentStateId);
};

const getLatestPosition = (positions: EquipmentPositionHistory['positions']) => {
    return positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

const Map: FC = () => {
    return (
        <MapContainer center={[-19.126536, -45.947756]} zoom={13} className="h-screen w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {equipmentPositionHistory.map((history: EquipmentPositionHistory) => {
                const latestPosition = getLatestPosition(history.positions);
                const equipmentInfo = equipment.find(eq => eq.id === history.equipmentId) as Equipment;
                const state = getLatestState(history.equipmentId);
                const stateHistory = equipmentStateHistory.find(h => h.equipmentId === history.equipmentId)?.states;

                if (!state || !latestPosition || !equipmentInfo || !stateHistory) {
                    console.warn('Missing data for equipment:', history.equipmentId);
                    return null;
                }

                return (
                    <Marker
                        key={history.equipmentId}
                        position={[latestPosition.lat, latestPosition.lon]}
                        icon={svgIcon}
                    >
                        <Popup>
                            <EquipmentPopup 
                                equipment={equipmentInfo} 
                                state={state} 
                                stateHistory={stateHistory} 
                            />
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;
