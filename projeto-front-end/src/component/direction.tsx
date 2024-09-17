import React, { useEffect, useState } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

interface Coordinates {
  date: string;
  lat: number;
  lon: number;
}

interface DirectionsProps {
  coordinates: Coordinates[];
}

function Directions({ coordinates }: DirectionsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Show only the first 20 positions
  const limitedCoordinates = coordinates.slice(0, 20);

  console.log(limitedCoordinates)

  // Define origin, destination and waypoints based on limitedCoordinates
  const origin = limitedCoordinates[0] 
    ? { lat: limitedCoordinates[0].lat, lng: limitedCoordinates[0].lon } 
    : null;

  const destination = limitedCoordinates[limitedCoordinates.length - 1]
    ? { lat: limitedCoordinates[limitedCoordinates.length - 1].lat, lng: limitedCoordinates[limitedCoordinates.length - 1].lon }
    : null;

  const waypoints = limitedCoordinates.slice(1, limitedCoordinates.length - 1).map(coord => ({
    location: { lat: coord.lat, lng: coord.lon , place: coord.date },
    stopover: true
  }));

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service to route through the coordinates
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination) return;

    directionsService
      .route({
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService]);

  // Update direction route when index changes
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>S
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={`${route.summary}-${index}`}>
            <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Directions;
