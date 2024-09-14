import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { Equipment } from "../interfaces";
import { fetchOrderedPositions } from "../api/simulatedApi";
import { useThemeStore } from "../store/themeStore";

export const MapComponent = ({
  equipments,
  selectEquipment,
}: {
  equipments: Equipment[];
  selectEquipment: (equipment: Equipment) => void;
}) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const getLastPosition = (id: string) => {
    const lastPosition = fetchOrderedPositions(id)[0];

    return {
      lat: lastPosition.lat,
      lng: lastPosition.lon,
    };
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        colorScheme={isDarkMode ? "DARK" : "LIGHT"}
        className="w-full h-full"
        defaultCenter={getLastPosition(equipments[0].id)}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="2e7c8bde9a9f1eb3"
      >
        {equipments
          ? equipments.map((equipment) => {
              return (
                <AdvancedMarker
                  key={equipment.id}
                  clickable
                  onClick={() => selectEquipment(equipment)}
                  position={getLastPosition(equipment.id)}
                >
                  {/* This can be replaced with equipament type component */}
                  <Pin
                    background={"#0f9d58"}
                    borderColor={"#006425"}
                    glyphColor={"#60d98f"}
                  />
                </AdvancedMarker>
              );
            })
          : null}
      </Map>
    </APIProvider>
  );
};
