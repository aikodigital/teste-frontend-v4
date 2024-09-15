import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Equipment } from "../interfaces";
import { fetchOrderedPositions } from "../api/simulatedApi";
import { useThemeStore } from "../store/themeStore";
import { EquipmentPin } from "./equipmentPin";

export const MapComponent = ({
  equipments,
  selectedEquipment,
  selectEquipment,
}: {
  equipments: Equipment[];
  selectedEquipment?: Equipment;
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

  const defaultCenter = {
    lat: -19.192595,
    lng: -46.061072,
  };

  return (
    <APIProvider apiKey={API_KEY}>
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
        {equipments.length > 0
          ? equipments.map((equipment) => {
              return (
                <AdvancedMarker
                  key={equipment.id}
                  clickable
                  onClick={() => selectEquipment(equipment)}
                  position={getLastPosition(equipment.id)}
                >
                  <EquipmentPin
                    equipment={equipment}
                    isSelected={equipment.id === selectedEquipment?.id}
                  />
                </AdvancedMarker>
              );
            })
          : null}
      </Map>
    </APIProvider>
  );
};
