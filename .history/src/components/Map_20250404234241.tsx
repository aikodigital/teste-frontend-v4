import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Truck, TracerClaw, Harvester } from './Icons';

const position: number[] = [-23.55052, -46.633308]

const truckIcon = L.icon({
    iconUrl: Truck,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});
const TracerClawIcon = L.icon({
    iconUrl: TracerClaw,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});
const HarvesterIcon = L.icon({
    iconUrl: Harvester,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});


const Map = () => {
    return (
        <MapContainer center={position} zoom={13} style={{ height: "801px", width: "100%" }} zoomControl={false} attributionControl={false}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CartoDB'
            />
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position} icon={truckIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
