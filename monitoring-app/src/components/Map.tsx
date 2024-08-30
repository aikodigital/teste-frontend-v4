import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import 'leaflet/dist/leaflet.css';

interface Position {
    lat: number;
    lon: number;
    date: string;
}

interface EquipmentPosition {
    equipmentId: string;
    positions: Position[];
}

interface Equipment {
    id: string;
    name: string;
    equipmentModelId: string;
}

interface StateHistory {
    equipmentId: string;
    states: {
        equipmentStateId: string;
        date: string;
    }[];
}

interface StatesStatus {
    id: string;
    name: string;
    color: string;
}

const Map: React.FC = () => {
    const positions = useSelector((state: RootState) => state.equipment.positions) as EquipmentPosition[];
    const equipments = useSelector((state: RootState) => state.equipment.equipments) as Equipment[];
    const stateHistory = useSelector((state: RootState) => state.equipment.stateHistory) as StateHistory[];
    const statesStatus = useSelector((state: RootState) => state.equipment.states) as StatesStatus[];

    return (
        <MapContainer center={[-19.126536, -45.947756]} zoom={11} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {positions.map((position) => {
                const equipment = equipments.find(e => e.id === position.equipmentId);
                if (!equipment) return null;
                const latestPosition = position.positions[position.positions.length - 1];
                const states = stateHistory.find(h => h.equipmentId === position.equipmentId);
                const latestState = states?.states[states?.states.length - 1];
                const status = latestState ? statesStatus.find(h => h.id === latestState.equipmentStateId) : null;
                console.log(states);

                return (
                    <Marker
                        key={position.equipmentId}
                        position={[latestPosition.lat, latestPosition.lon]}
                        eventHandlers={{
                            mouseover: () => handleMouseOver(equipment),
                            mouseout: handleMouseOut,
                        }}
                    >

                        <Popup>
                            <div>
                                <p className='font-bold text-lg'>{equipment.name}</p>
                                <p className='text-base' style={{ color: status?.color }} >Status: {status?.name}</p>
                                <h1>Últimos status:</h1>
                            </div>
                            <div className='h-28 overflow-scroll'>

                                {states?.states && states.states.map((state) => {
                                    return (
                                        <div className='mr-3'>
                                            <span>{new Date(state.date).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false })} - </span>
                                            <span>{statesStatus.find(h => h.id === latestState?.equipmentStateId)?.name}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </Popup>

                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;