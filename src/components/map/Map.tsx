import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Body } from './styles/styles';
import { mapEquipmentData } from '../../services/mapEquipmentData';
import { MapEquipmentData } from '../../interfaces/interfaces';
import { useContextData } from '../../context/context';

export default function Map() {
    const { selectedState, selectedModel, searchTag } = useContextData();

    const equipmentPositions = mapEquipmentData() as MapEquipmentData[];

    const initialPosition: [number, number] = [equipmentPositions[0]?.lat, equipmentPositions[0]?.lon];

    return (
        <>
            <Body>
                <MapContainer center={initialPosition} zoom={13} style={{ height: "500px", width: "50%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {equipmentPositions
                        .filter(equipment => 
                            (!selectedState || equipment.state === selectedState) &&
                            (!selectedModel || equipment.name === selectedModel) &&
                            (!searchTag || equipment.tag.includes(searchTag))
                        ).map((equipment: MapEquipmentData) => (
                        equipment &&  (
                        <Marker
                            key={equipment.id}
                            position={[equipment.lat, equipment.lon]}
                            icon={new L.Icon({
                                iconUrl: equipment.icon,
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41],
                                className: `marker-${equipment.id}`
                            })}
                        >
                            <Popup>
                                Modelo: <strong>{equipment.name}</strong>
                                <br />
                                Estado: {equipment.state}
                                <br />
                                Produtividade: {equipment.productivity}
                                <br />
                                Ganhos: R${equipment.earnings}
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

