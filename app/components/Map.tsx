"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface MapComponentProps {
  lat: number;
  lon: number;
}

export default function Map({ lat, lon }: MapComponentProps) {
  return (
    <div className="w-full h-96">
      <MapContainer center={[lat, lon]} zoom={13} className="h-full w-full rounded-lg ">
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            Location: {lat}, {lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
