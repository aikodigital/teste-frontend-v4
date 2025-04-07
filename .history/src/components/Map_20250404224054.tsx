import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const position: number[] = [-23.55052, -46.633308]

const Map = () => {
    return (
        <MapContainer center={position} zoom={13} style={{ height: "801px", width: "100%" }} zoomControl={false} attributionControl={false}>
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
