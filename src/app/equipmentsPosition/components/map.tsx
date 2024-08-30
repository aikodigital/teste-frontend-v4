"use client";
import React from "react";
import { GoogleMap, InfoWindow, LoadScriptNext, Marker } from "@react-google-maps/api";
import { Position } from "@/types/Position";

interface MapComponentProps {
  positions: Position[];
  lastState?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ positions, lastState }) => {
  const mapStyle = {
    width: "850px",
    height: "500px",
  };

  const positionLastIndex = positions?.length -1 || 0;

  const center = {
    lat: positions[positionLastIndex]?.lat || 0,
    lng: positions[positionLastIndex]?.lng || 0,
  };

  return (
    <LoadScriptNext googleMapsApiKey={process.env.GOOGLE_API_KEY ?? ""}>
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={center}
        zoom={12}
        mapTypeId="satellite"
      >
        {positions.map((item, index) => (
          <Marker key={index} position={item} title={new Date(item.date).toLocaleString()}>
            {index === positionLastIndex && (
              <InfoWindow position={{ lat: item.lat, lng: item.lng }}>
                <div className="w-auto h-max">
                  <p className="font-bold">Última Posição:</p>
                  <p>{new Date(item.date).toLocaleString()}</p>

                  <p className="font-bold mt-3">Estado:</p>
                  <p>{lastState}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;
