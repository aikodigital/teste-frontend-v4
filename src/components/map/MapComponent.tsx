import React, { useEffect, useState } from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { useParams } from 'react-router-dom';
import { IPosition } from '../../models/EquipmentPositionHistory';



const MapComponent = ({ positions }: { positions: IPosition[]}) => {


  const firstPosition = {
    lat: positions[0].lat,
    lng: positions[0].lon,
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_MAP_KEY || ""}>
    <Map defaultCenter={firstPosition} defaultZoom={10}>
        {positions.map((position, index) => (
        <Marker
            key={index}
            position={{ lat: position.lat, lng: position.lon }}
        />
        ))}
    </Map>
    </APIProvider>
  );
};

export default MapComponent;
