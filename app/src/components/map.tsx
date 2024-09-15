import {
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Polyline } from "@react-google-maps/api";
import { Equipment } from "../interfaces";
import { fetchOrderedPositions } from "../api/simulatedApi";
import { useThemeStore } from "../store/themeStore";
import { EquipmentPin } from "./equipmentPin";
import { useEffect } from "react";

export const MapComponent = ({
  equipments,
  selectedEquipment,
  selectEquipment,
  positionHistory,
}: {
  equipments: Equipment[];
  selectedEquipment?: Equipment;
  selectEquipment: (equipment: Equipment) => void;
  positionHistory?: {
    date: string;
    lat: number;
    lon: number;
  }[];
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const map = useMap();
  const maps = useMapsLibrary("maps");

  if (!maps) {
    return null;
  }

  const flightPath = new maps.Polyline({
    path: positionHistory?.map((pos) => ({
      lat: pos.lat,
      lng: pos.lon,
    })),

    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

  function removeLine(): void {
    flightPath.setMap(null);
  }

  const getLastPosition = (id: string) => {
    const lastPosition = fetchOrderedPositions(id)[0];

    return {
      lat: lastPosition.lat,
      lng: lastPosition.lon,
    };
  };

  const defaultCenter = {
    lat: -19.192595,
    lng: -46.061072,
  };

  return (
    <Map
      colorScheme={isDarkMode ? "DARK" : "LIGHT"}
      className="w-full h-full"
      defaultCenter={
        equipments.length > 0
          ? getLastPosition(equipments[0].id)
          : defaultCenter
      }
      defaultZoom={10}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapId="2e7c8bde9a9f1eb3"
    >
      <Polyline
        path={[
          { lat: 37.772, lng: -122.214 },
          { lat: 21.291, lng: -157.821 },
          { lat: -18.142, lng: 178.431 },
          { lat: -27.467, lng: 153.027 },
        ]}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 3,
          geodesic: true,
        }}
      />

      {equipments.length > 0
        ? equipments.map((equipment) => {
            return (
              <div key={equipment.id}>
                <AdvancedMarker
                  clickable
                  onClick={() => {
                    selectEquipment(equipment);
                  }}
                  position={getLastPosition(equipment.id)}
                >
                  <EquipmentPin
                    equipment={equipment}
                    isSelected={equipment.id === selectedEquipment?.id}
                  />
                </AdvancedMarker>
              </div>
            );
          })
        : null}
    </Map>
  );
};
