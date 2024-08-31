import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Title, Body } from './styles/styles';
import { mapEquipmentData } from '../../services/mapEquipmentData';
import { mapEquipmentDataInterface } from '../../services/interfaces/equipmentInterfaces';

import markerIcon from '../../assets/aiko.png';
import { useContextData } from '../../context/context';

export default function Map() {
    const { selectedState, selectedModel } = useContextData();

    const equipmentPositions = mapEquipmentData() as mapEquipmentDataInterface[];
    
    const position: [number, number] = [equipmentPositions[0]?.lat, equipmentPositions[0]?.lon];

    return (
        <>
            <Title>Mapa de monitoração de operação</Title>
            <Body>
                <MapContainer center={position} zoom={13} style={{ height: "500px", width: "50%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {equipmentPositions
                        .filter(equipment => 
                            (!selectedState || equipment.state === selectedState) &&
                            (!selectedModel || equipment.name === selectedModel)
                        ).map((equipment) => (
                        equipment &&  (
                        <Marker 
                            key={equipment.id} 
                            position={[equipment.lat, equipment.lon]} 
                            icon={new L.Icon({
                                iconUrl: markerIcon,
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41],
                                className: `marker-${equipment.id}`
                            })}
                        >
                            <Popup>
                                Nome: <strong>{equipment.name}</strong>
                                <br />
                                Estado: {equipment.state}
                                <h4>Histórico de Estados</h4>
                                <ul>
                                    {equipment.stateHistory.map((history, index) => (
                                        <li key={index}>
                                            {history.date}: {history.state}
                                        </li>
                                    ))}
                                </ul>
                            </Popup>
                        </Marker>
                        )
                    ))}
                </MapContainer>
            </Body>
        </>
    );
}

