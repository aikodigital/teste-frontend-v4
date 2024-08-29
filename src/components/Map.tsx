import { FC, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipment from '../data/equipment.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import { Equipment } from '../types/equipment';
import { EquipmentPositionHistory } from '../types/equipmentPositionHistory';
import { EquipmentState } from '../types/equipmentState';
import EquipmentPopup from './EquipmentPopup';
import { createIcon } from '../utils/createIcons';

const Map: FC = () => {
    const [filterState, setFilterState] = useState<string | null>(null);
    const [filterModel, setFilterModel] = useState<string | null>(null);

    const getLatestState = (equipmentId: string): EquipmentState | undefined => {
        const history = equipmentStateHistory.find(h => h.equipmentId === equipmentId);
        if (!history) return undefined;

        const latestStateEntry = history.states.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
        return equipmentState.find(state => state.id === latestStateEntry.equipmentStateId);
    };

    const getLatestPosition = (positions: EquipmentPositionHistory['positions']) => {
        return positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    };

    const filteredEquipment = equipmentPositionHistory.filter(history => {
        const latestPosition = getLatestPosition(history.positions);
        const equipmentInfo = equipment.find(eq => eq.id === history.equipmentId);
        const state = getLatestState(history.equipmentId);

        if (!latestPosition || !equipmentInfo || !state) return false;

        const matchesState = filterState ? state.name === filterState : true;
        const matchesModel = filterModel ? equipmentInfo.equipmentModelId === filterModel : true;

        return matchesState && matchesModel;
    });

    return (
        <div className="relative h-screen w-full">
            <div className="absolute bottom-0 left-0 p-4 bg-white z-[999] shadow-md ">
                <label className="block mb-2 ">
                    Filtrar por Estado:
                    <select 
                        value={filterState || ''} 
                        onChange={(e) => setFilterState(e.target.value || null)} 
                        className="ml-2 p-1 border border-gray-300 rounded"
                    >
                        <option value="">Todos</option>
                        {equipmentState.map(state => (
                            <option key={state.id} value={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="block mb-2">
                    Filtrar por Modelo:
                    <select 
                        value={filterModel || ''} 
                        onChange={(e) => setFilterModel(e.target.value || null)} 
                        className="ml-2 p-1 border border-gray-300 rounded"
                    >
                        <option value="">Todos</option>
                        {Array.from(new Set(equipment.map(eq => eq.equipmentModelId))).map(modelId => {
                            const model = equipment.find(eq => eq.equipmentModelId === modelId);
                            return model ? (
                                <option key={model.equipmentModelId} value={model.equipmentModelId}>
                                    {model.name}
                                </option>
                            ) : null;
                        })}
                    </select>
                </label>
            </div>
            <MapContainer center={[-19.126536, -45.947756]} zoom={13} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredEquipment.map((history) => {
                    const latestPosition = getLatestPosition(history.positions);
                    const equipmentInfo = equipment.find(eq => eq.id === history.equipmentId) as Equipment;
                    const state = getLatestState(history.equipmentId);
                    const stateHistory = equipmentStateHistory.find(h => h.equipmentId === history.equipmentId)?.states;

                    if (!state || !latestPosition || !equipmentInfo || !stateHistory) {
                        console.warn('Missing data for equipment:', history.equipmentId);
                        return null;
                    }

                    const modelId = equipmentInfo.equipmentModelId;
                    const icon = createIcon(modelId);

                    return (
                        <Marker
                            key={history.equipmentId}
                            position={[latestPosition.lat, latestPosition.lon]}
                            icon={icon}
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
        </div>
    );
};

export default Map;
