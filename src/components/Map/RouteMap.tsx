import { Map, useMap, useMapsLibrary, } from "@vis.gl/react-google-maps";

import { useEquipmentStore, useFilterStore } from "@/lib/store";
import { mapId } from "@/config/env";
import { useEffect, useState } from "react";

export default function RouteMap() {
    const { equipmentId } = useFilterStore();

    const { positionHistory } = useEquipmentStore();

    const position = { lat: -19.126536, lng: -45.947756 };

    const equipmentPositionHistory = positionHistory.find((history) => history.equipmentId === equipmentId);

    const Directions = () => {
        const map = useMap();
        const routesLibrary = useMapsLibrary("routes");
        const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
        const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

        useEffect(() => {
            if (!map || routesLibrary == null) return;

            setDirectionsService(new routesLibrary.DirectionsService());
            setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
                map,
                polylineOptions: {
                    strokeColor: "blue"
                }
            }));
        }, [map, routesLibrary]);

        useEffect(() => {
            if (!directionsService || !directionsRenderer || !equipmentPositionHistory) return;

            directionsService.route({
                origin: { lat: equipmentPositionHistory.positions[0].lat, lng: equipmentPositionHistory.positions[0].lon },
                destination: { lat: equipmentPositionHistory.positions[equipmentPositionHistory.positions.length - 1].lat, lng: equipmentPositionHistory.positions[equipmentPositionHistory.positions.length - 1].lon },
                travelMode: google.maps.TravelMode.DRIVING
                /**
                * This is the way to add waypoints to the route
                * Uncomment the following lines to add waypoints
                * This was not used because of the waypoints limit
                * of the Google Maps API. More than 10 waypoints
                * is expensive
                waypoints: equipmentPositionHistory?.positions.map((position) => ({
                    location: { lat: position.lat, lng: position.lon },
                    stopover: true,
                })) || [],
                */
            }).then((response) => {
                directionsRenderer.setDirections(response);
            }).catch((error) => {
                console.error("Directions request failed due to " + error);
            });

            // Cleanup function to clear the route when equipmentId changes
            return () => {
                directionsRenderer.setMap(null);
            };
        }, [directionsService, directionsRenderer]);

        return null;
    }

    return (
        <Map
            mapId={mapId}
            colorScheme='FOLLOW_SYSTEM'
            defaultZoom={10}
            defaultCenter={position}
            fullscreenControl={false}
            streetViewControl={false}
        >
            <Directions />
        </Map>
    );
}