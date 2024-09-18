import { useParams } from "react-router-dom";
import { useEquipment } from "../../api/equipment";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { Badge } from "../../components/Badge";
import { Timeline } from "./components/Timeline";
import { Box, Card } from "@mui/material";
import { CardDetails } from "../../components/Card";
import { LatLngExpression } from "leaflet";

import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";

const Details = () => {
  const { id } = useParams();
  const { equipment } = useEquipment(id);

  const route: LatLngExpression[] = equipment.positions.map((pos) => [
    pos.lat,
    pos.lon,
  ]);

  return (
    <Box maxWidth={2000} margin="auto">
      <Box
        display="flex"
        width="80%"
        flexWrap="wrap"
        margin="15px auto 10px auto"
        justifyContent="flex-end"
        sx={{
          justifyContent: {
            xs: "center",
          },
        }}
      >
        <CardDetails
          name={"Perda em Manutenção"}
          totalValue={equipment.totalMaintenance}
          bg="#853027"
        >
          <EngineeringOutlinedIcon htmlColor="#fff" fontSize="large" />
        </CardDetails>

        <CardDetails
          name={"Receita Total do Equipamento"}
          totalValue={equipment.totalOperating}
          bg="#2c9b5a"
        >
          <MonetizationOnOutlinedIcon htmlColor="#fff" fontSize="large" />
        </CardDetails>
        <CardDetails
          name={"Perda com Equipamento Parado"}
          totalValue={equipment.totalStopped}
          bg="#ceaf35"
        >
          <BlockOutlinedIcon htmlColor="#fff" fontSize="large" />
        </CardDetails>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        width="100%"
        p={0}
        justifyContent="space-between"
      >
        <Timeline equipment={equipment} />
        <Card
          elevation={5}
          className="leaflet-container-details"
          sx={{
            width: {
              xl: "70%",
              lg: "70%",
              md: "90%",
              sm: "90%",
            },
            marginTop: {
              sm: 3,
              xs: 6,
            },
          }}
        >
          <MapContainer center={[-19.126536, -45.407756]} zoom={11}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {equipment.positions.map((pos, idx) => (
              <Marker
                key={idx}
                position={[pos.lat, pos.lon] as LatLngExpression}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                  mouseout: (e) => {
                    e.target.closePopup();
                  },
                  click: (e) => {
                    e.target.openPopup();
                  },
                }}
              >
                <Popup keepInView={true} className="poup">
                  <Badge bgColor={"green"}>
                    {" "}
                    Rota {idx} - {pos.date}{" "}
                  </Badge>
                </Popup>
              </Marker>
            ))}

            <Polyline
              positions={route}
              color="#FFA07A"
              weight={3}
              dashArray={[1, 5]}
              opacity={0.7}
            />
          </MapContainer>
        </Card>
      </Box>
    </Box>
  );
};
export default Details;
