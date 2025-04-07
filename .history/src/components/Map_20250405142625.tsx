import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Truck, TracerClaw, Harvester } from './Icons';

const position: number[] = [-23.55052, -46.633308]

const truckIcon = L.icon({
    iconUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMiIgdmlld0JveD0iMCAwIDk2MCA5NjAiIHdpZHRoPSI5NjAiIGhlaWdodD0iOTYwIj48dGl0bGU+a2V5Ym9hcmRfYXJyb3dfZG93bl8yNGRwX0UzRTNFM19GSUxMMF93Z2h0NDAwX0dSQUQwX29wc3oyNDwvdGl0bGU+PGRlZnM+PGltYWdlIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBpZD0iaW1nMSIgaHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9yR05... (continua)",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

// const TracerClawIcon = L.icon({
//     iconUrl: TracerClaw,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
// });
// const HarvesterIcon = L.icon({
//     iconUrl: Harvester,
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
// });


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
