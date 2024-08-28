import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import equipmentPositionHistory from '../../../data/equipmentPositionHistory.json'

import icon from '../../../assets/icons/Truck_2.png'

import './Map.scss';

const MAP_STYLE: React.CSSProperties = {
  width: '100%',
  height: '500px',
};

// const CENTER_COORDINATES: { lat: number; lng: number } = {
//   lat: -3.745,
//   lng: -38.523,
// };

// const MARKERS: { lat: number; lng: number; title: string; iconColor: string }[] = [
//   { lat: -3.745, lng: -38.523, title: 'Marker 1', iconColor: 'red' },
//   { lat: -3.735, lng: -38.513, title: 'Marker 2', iconColor: 'blue' },
//   { lat: -3.725, lng: -38.503, title: 'Marker 3', iconColor: 'green' },
// ];

const API_KEY: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map: React.FC = () => {
  const [centerCoords, setCenterCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);

  const [isHovered, setIsHovered] = useState<string>('');

  const { isLoaded }: { isLoaded: boolean } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: API_KEY as string,
  });

  function averageGeolocation(): { latitude: number; longitude: number } {
    const coords: { lat: number; lon: number }[] = equipmentPositionHistory.map(history => {
      const lastPosition = history.positions[history.positions.length - 1];
      return { lat: lastPosition.lat, lon: lastPosition.lon };
    });

    console.log({ coords });

    if (coords.length === 1) {
      return {
        latitude: coords[0].lat,
        longitude: coords[0].lon
      };
    }

    let x: number = 0.0;
    let y: number = 0.0;
    let z: number = 0.0;

    for (let coord of coords) {
      let latitude: number = coord.lat * Math.PI / 180;
      let longitude: number = coord.lon * Math.PI / 180;

      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }

    let total: number = coords.length;

    x = x / total;
    y = y / total;
    z = z / total;

    let centralLongitude: number = Math.atan2(y, x);
    let centralSquareRoot: number = Math.sqrt(x * x + y * y);
    let centralLatitude: number = Math.atan2(z, centralSquareRoot);

    const result = {
      latitude: centralLatitude * 180 / Math.PI,
      longitude: centralLongitude * 180 / Math.PI
    };

    setCenterCoords({
      lat: result.latitude,
      lng: result.longitude
    });

    return result;
  }

  useEffect(() => {
    if(!equipmentPositionHistory) return alert('coords is missing')
    averageGeolocation()
  }, [])

  if(!API_KEY) {
    alert('API key is missing.');
    return null;
  }

  return (
    <div className='map-container'>
      {isLoaded 
        ? (
          <GoogleMap
            mapContainerStyle={MAP_STYLE}
            center={centerCoords}
            zoom={10}
          >
            <div className='marker-container'>
              {equipmentPositionHistory.map((history, index) => {
                const lastPosition = history.positions[history.positions.length - 1];
                const id = history.equipmentId
                console.log({history})
                const date = new Date(lastPosition.date)
                return (
                  <Marker
                    key={index}
                    position={{ lat: lastPosition.lat, lng: lastPosition.lon }}
                    onMouseOver={() => setIsHovered(id)}
                    onMouseOut={() => setIsHovered('')}
                    label={date.toLocaleDateString('pt-BR')}
                    icon={{
                      url: icon,
                      scaledSize: new google.maps.Size((isHovered == id) ? 60 : 50, (isHovered == id) ? 60 : 50),
                      anchor: new google.maps.Point(25, 25),
                    }}
                  />
                )
              })}
            </div>
          </GoogleMap>
          ):(
          <></>
      )}
      
    </div>
  );
};

export default Map;
