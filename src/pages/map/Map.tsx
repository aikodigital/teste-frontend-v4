import React, { useEffect, useState } from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import './Map.css';
import { IEquipmentPositionHistory } from '../../models/EquipmentPositionHistory';



const MapComponent = () => {
  const [equipmentHistory, setEquipmentHistory] =
    useState<IEquipmentPositionHistory>({
      equipmentId: "",
      positions: [],
    });

  useEffect(() => {
    getEquipmentPositionHistory();
  }, []);

  const getEquipmentPositionHistory = async () => {
    try {
      const resp: any = await fetch("data/equipmentPositionHistory.json");
      const data = await resp.json();
      setEquipmentHistory(data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  if (!equipmentHistory.positions.length) {
    return null;
  }

  const firstPosition = {
    lat: equipmentHistory.positions[0].lat,
    lng: equipmentHistory.positions[0].lon,
  };

  return (
    <div className="map-container">
      <APIProvider apiKey={process.env.REACT_APP_MAP_KEY || ""}>
        <Map defaultCenter={firstPosition} defaultZoom={10}>
          {equipmentHistory.positions.map((position, index) => (
            <Marker
              key={index}
              position={{ lat: position.lat, lng: position.lon }}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
