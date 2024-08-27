import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useData } from "./context/DataContext";
import "./index.css";

import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

const markers = [
  {
    geocode: [-19.126536, -45.947756],
    popUp: "Hello, I am pop up 1",
  },
  {
    geocode: [-19.167338, -46.00347],
    popUp: "Hello, I am pop up 2",
  },
  {
    geocode: [-19.192595, -46.061072],
    popUp: "Hello, I am pop up 3",
  },
];

export default function App() {
  const {
    equipmentPositionHistory,
    equipmentBasicData,
    equipmentModel,
    equipmentState,
    equipmentStateHistory,
    loading,
    error,
  } = useData();

  console.log(
    { equipmentPositionHistory },
    { equipmentBasicData },
    { equipmentModel },
    { equipmentState },
    { equipmentStateHistory },
    loading,
    error
  );

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <MapContainer center={[-19.126536, -45.947756]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker position={marker.geocode} icon={customIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
