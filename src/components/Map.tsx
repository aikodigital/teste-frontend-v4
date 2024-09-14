import {GoogleMap, Marker, InfoWindow, LoadScript,} from "@react-google-maps/api";
import { useState } from "react";
import useStore from "../../store/useStore";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -19.126536,
  lng: -45.947756,
};

const MapComponent = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const equipmentPositions = useStore((state) => state.equipmentPositions);
  const equipmentStates = useStore((state) => state.equipmentStates);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAtbgaltM8pe6e-697DRcmrHQajaYm3Fm4">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {equipmentPositions.map((pos) => (
          <Marker
            key={pos.equipmentId}
            position={{ lat: pos.lat, lng: pos.lon }}
            onClick={() => setSelectedEquipment(pos)}
          />
        ))}

        {selectedEquipment && (
          <InfoWindow
            position={{
              lat: selectedEquipment.lat,
              lng: selectedEquipment.lon,
            }}
            onCloseClick={() => setSelectedEquipment(null)}
          >
            <div>
              <h2>Equipamento: {selectedEquipment.equipmentId}</h2>
              {/* Mostrar o estado mais recente */}
              <p>Estado atual: {/* Busque o estado baseado no ID */}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
