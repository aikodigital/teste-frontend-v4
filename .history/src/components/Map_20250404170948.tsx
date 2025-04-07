import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";

const historicalPositions = [
    [-23.55052, -46.633308], // São Paulo (exemplo)
    [-22.906847, -43.172896], // Rio de Janeiro (exemplo)
    [-25.428356, -49.273251]  // Curitiba (exemplo)
];

const Map = () => {
    return (
        <MapContainer center={historicalPositions[0]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Linha do trajeto */}
            <Polyline positions={historicalPositions} color="blue" />

            {/* Marcadores das posições */}
            {historicalPositions.map((pos, index) => (
                <Marker key={index} position={pos}>
                    <Popup>Posição {index + 1}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
