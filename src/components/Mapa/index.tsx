import { Box } from "@mui/material";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { CompleteEquipmentData } from "../../types";
import Marcador from "../Marcador";

export type MapaProps = {
  fullEquipmentData: CompleteEquipmentData;
};

const Mapa = ({ fullEquipmentData }: MapaProps) => {
  const initialPosition: LatLngTuple = [
    fullEquipmentData[0].positions[0].lat,
    fullEquipmentData[0].positions[0].lon,
  ];

  return (
    <Box>
      <MapContainer center={initialPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fullEquipmentData?.map((equipment, key) => (
          <Marcador equipment={equipment} key={key} />
        ))}
      </MapContainer>
    </Box>
  );
};

export default Mapa;
