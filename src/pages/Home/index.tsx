import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { useEquipments } from "../../api/useEquipaments";
import { Badge } from "../../components/Badge";
import { Filters } from "./Filters";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Home = () => {
  const { equipments, setFilter } = useEquipments();
  const navigate = useNavigate();
  const names: string[] = [];

  const handlePopupClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  return (
    <Box>
      <MapContainer center={[-19.12653, -45.947756]} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {equipments.map((equipment) => {
          names.push(equipment.name);
          return (
            <Marker
              eventHandlers={{
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                },
                click: (e) => {
                  e.target.openPopup();
                  handlePopupClick(equipment?.id);
                },
              }}
              key={equipment.id}
              position={[
                equipment.lastPosition.lat,
                equipment.lastPosition.lon,
              ]}
            >
              <Popup keepInView={true} className="poup">
                {equipment.name} - {equipment.model?.name} <br />
                {equipment.lastState && (
                  <Badge bgColor={equipment.lastState.color}>
                    {equipment.lastState.name}
                  </Badge>
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <Filters setFilters={setFilter} names={names} />
    </Box>
  );
};
export default Home;
