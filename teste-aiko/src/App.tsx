import "./index.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";


const App = () => {

  type markerType = {
    equipmentId: String,
    geocode: LatLngExpression,
  }

  const markers: markerType[] = [
    {
      equipmentId: "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
      geocode: [-19.151801, -46.007759]
    },
    {
      equipmentId: "1c7e9615-cc1c-4d72-8496-190fe5791c8b",
      geocode: [-19.195811, -45.825157]
    },
    {
      equipmentId: "2b5796cb-21c1-480e-8886-4498ea593a65",
      geocode: [-19.134644, -46.087206]
    },
    {
      equipmentId: "1d222cdc-01dd-4caa-8934-5351d3995cfb",
      geocode: [-18.978732, -45.918204]
    },
    {
      equipmentId: "491b983b-950c-4a88-942d-487e99b92540",
      geocode: [-19.027071, -46.004085]
    },
    {
      equipmentId: "39317fcb-79e7-4e7e-83dc-723a9b63633c",
      geocode: [-19.287676, -46.082552]
    },
    {
      equipmentId: "c79ef1de-92f3-4edd-bd55-553056640449",
      geocode: [-19.091692, -46.14889]
    },
    {
      equipmentId: "b7aaba00-13f7-44a0-8bf1-bc163afcf9d8",
      geocode: [-19.172475, -46.080028]
    },
    {
      equipmentId: "fe2a2e11-bfa6-46b6-990b-fd8175946b7e",
      geocode: [-19.163073, -46.06338]
    }
  ];

  return (
    <MapContainer center={[-19.151801, -46.007759]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {markers.map(marker => (
    <Marker position={marker.geocode}>

    </Marker>
  ))
  }
  
  </MapContainer>
  )
}

export default App
