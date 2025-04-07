import { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";

const historicalPositions = [
    [-23.55052, -46.633308], // São Paulo (exemplo)
    [-22.906847, -43.172896], // Rio de Janeiro (exemplo)
    [-25.428356, -49.273251]  // Curitiba (exemplo)
];

// Componente para corrigir problemas de renderização do mapa
const FixMap = () => {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize(); // Força o Leaflet a recalcular o tamanho corretamente
        }, 100);
    }, [map]);

    return null;
};

const Map = () => {
    return (
        <MapContainer center={historicalPositions[0]} zoom={13} style={{ height: "calc(100vh - 121px)", width: "100%" }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
