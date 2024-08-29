"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


interface Position {
  lat: number;
  lng: number;
  date: string;
}

interface MapComponentProps {
  positions: Position[];
}

const MapComponent: React.FC<MapComponentProps> = ({ positions }) => {
  const mapContainerStyle = {
    width: "850px",
    height: "500px",
  };

  const positionLastIndex = positions?.length -1 || 0;

  const center = {
    lat: positions[positionLastIndex]?.lat || 0,
    lng: positions[positionLastIndex]?.lng || 0,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC9B1QpT9g1xIolS7XORsi4erF1xeaa3Ss">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        {positions.map((item, index) => (
          <Marker key={index} position={item} title={item.date}/>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
