'use client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useState } from 'react';
import CustomMarker from '@/components/custom-marker'; 
import { useEquipmentStateHistory } from '@/hooks/useEquipmentStateHistory';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function HomePage() {
    const [zoom, setZoom] = useState(13);
    const [center, setCenter] = useState<any>([51.505, -0.09]);
    const [style, setStyle] = useState<any>({
        height: '800px',
        width: '100%',
    });

    const { data ,  isLoading } = useEquipmentStateHistory();

    console.log(data);

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={style}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            ></TileLayer>
                <CustomMarker position={[51.505, -0.09]} popupText="Hello World!" />
            …</MapContainer>
    )
}