import React from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const createIcon = (icon: React.ReactNode) => {
  return L.divIcon({
    html: ReactDOMServer.renderToString(icon),
    className: "leaflet-div-icon",
    iconSize: [32, 32],
  });
};

interface MapProps {
  center?: [number, number];
  zoom?: number;
}

const Map = ({ center = [51.505, -0.09], zoom = 8 }: MapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
