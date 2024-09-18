import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Position } from "../model/position.model";
import { formatDate } from "../util/formatDate";
interface Props {
  data: Array<Position>;
}
export default function Map({ data }: Props) {
  const centerPosition =
    data.length > 0 ? [data[0].lat, data[0].lon] : [-19.126536, -45.947756]; // Fallback: Brasil
  return (
    <MapContainer
      center={centerPosition}
      zoom={10}
      style={{ height: "70vh", width: "70vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((position, index) => (
        <Marker key={index} position={[position.lat, position.lon]}>
          <Popup>
            {position.equipmentModel &&
             <h1>
              {position?.equipmentModel?.name} - {position?.name}{" "}
            </h1>}
            {position?.states != undefined && (
              <>
                <p>
                  Status:
                  <span style={{ color: position?.states[0]?.color }}>
                    {position?.states[0]?.name}
                  </span>
                </p>
              </>
            )}
            <p>Data: {formatDate(new Date(position?.date))}</p>

          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

