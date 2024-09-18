
import "./index.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { MapEquipmentInterface } from "../../interfaces/MapEquipment";

export default function Map() {
    
  const equipments = useSelector((state: RootState) => state.mapEquipments);
    
  const customIcon = new Icon({
    iconUrl: "src/assets/box-truck.png",
    iconSize: [38, 38]
  })

  return (
    <MapContainer center={[-19.151801, -46.007759]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      <MarkerClusterGroup chunkedLoading >
      {equipments?.map((equipment: MapEquipmentInterface) => (
        <Marker position={equipment.lastPosition as LatLngExpression} icon={customIcon} key={uuidv4()}>
          <Popup>
            <p>Id: {equipment.equipmentId}</p>
            <p>State: {equipment.currentState}</p>

          </Popup>
        </Marker>
      ))
    }
      </MarkerClusterGroup>
    </MapContainer>
  )
}