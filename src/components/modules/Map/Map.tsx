import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import equipmentPositionHistory from "../../../data/equipmentPositionHistory.json";

import icon from "../../../assets/icons/Truck_2.png";

import "./Map.scss";

const MAP_STYLE: React.CSSProperties = {
  width: "100%",
  height: "500px",
};

const API_KEY: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map: React.FC = () => {
  const [centerCoords, setCenterCoords] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  const [isHovered, setIsHovered] = useState<string>("");

  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded }: { isLoaded: boolean } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: API_KEY as string,
  });

  const markerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  function handleClick(
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    label: string
  ): (() => void) | void {
    console.log("caiu aquiiiiiiiiiiiiiiiii");
    if (mapRef.current) {
      console.log("caindo aqui ta ");
      const marker: google.maps.Marker = new google.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          url: icon,
          scaledSize: new google.maps.Size(50, 50),
          anchor: new google.maps.Point(25, 25),
        },
      });
  
      markerRef.current = marker;
  
      const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 10px;">${label}</div>`,
      });
  
      infoWindowRef.current = infoWindow;
  
      // Abre a InfoWindow imediatamente após criar o marcador
      infoWindow.open(marker.getMap(), marker);
  
      marker.addListener("click", () => {
        console.log("Marker clicked");
        infoWindow.open(marker.getMap(), marker);
      });
  
      return () => {
        marker.setMap(null);
        infoWindow.close();
      };
    }
  }
  

  function averageGeolocation(): { latitude: number; longitude: number } {
    const coords: { lat: number; lon: number }[] = equipmentPositionHistory.map(
      (history) => {
        const lastPosition = history.positions[history.positions.length - 1];
        return { lat: lastPosition.lat, lon: lastPosition.lon };
      }
    );

    console.log({ coords });

    if (coords.length === 1) {
      return {
        latitude: coords[0].lat,
        longitude: coords[0].lon,
      };
    }

    let x: number = 0.0;
    let y: number = 0.0;
    let z: number = 0.0;

    for (let coord of coords) {
      let latitude: number = (coord.lat * Math.PI) / 180;
      let longitude: number = (coord.lon * Math.PI) / 180;

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
      latitude: (centralLatitude * 180) / Math.PI,
      longitude: (centralLongitude * 180) / Math.PI,
    };

    setCenterCoords({
      lat: result.latitude,
      lng: result.longitude,
    });

    return result;
  }

  useEffect(() => {
    if (equipmentPositionHistory && isLoaded) {
      const center = averageGeolocation();
      if (mapRef.current) {
        mapRef.current.setCenter({
          lat: center.latitude,
          lng: center.longitude,
        });
      }
    }
  }, [equipmentPositionHistory, isLoaded]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (!API_KEY) {
    alert("API key is missing.");
    return null;
  }

  return (
    <div className="map-container">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={MAP_STYLE}
          center={centerCoords}
          zoom={10}
          onLoad={onLoad}
        >
          <div className="marker-container">
            {mapRef.current &&
              isLoaded &&
              equipmentPositionHistory.length > 0 &&
              equipmentPositionHistory.map((history, index) => {
                const lastPosition =
                  history.positions[history.positions.length - 1];
                const lastPositionCoords = {
                  lat: lastPosition.lat,
                  lng: lastPosition.lon,
                };
                const positionId = index.toString();
                console.log({ history });
                const date = new Date(lastPosition.date);
                return (
                  <Marker
                    position={lastPositionCoords}
                    onMouseOver={() => setIsHovered(positionId)}
                    onMouseOut={() => setIsHovered("")}
                    onClick={() =>
                      handleClick(
                        lastPositionCoords,
                        date.toLocaleDateString("pt-BR")
                      )
                    }
                    icon={{
                      url: icon,
                      scaledSize: new google.maps.Size(
                        isHovered === positionId ? 60 : 50,
                        isHovered === positionId ? 60 : 50
                      ),
                      anchor: new google.maps.Point(25, 25),
                    }}
                  />
                );
              })}
          </div>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Map;
