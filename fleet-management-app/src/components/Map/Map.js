import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer } from 'react-leaflet';
import MarkersList from '../MarkersList';
import Image from "next/image";

export default function Map() {
  return (
    <MapContainer className="h-screen w-full" center={[-19.151801, -46.007759]} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkersList/>
      <Image
        src="/aiko.png"
        width={100}
        height={50}
        data-index
        className="absolute block top-4 left-14 z-[10000]"
        alt="Logo Aiko"
      />
    </MapContainer>
  )
}
