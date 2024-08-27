import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Fragment, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useData } from "./context/DataContext";
import "./index.css";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
});

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
  const [markers, setMarkers] = useState([]);

  // console.log(
  //   equipmentPositionHistory,
  //   { equipmentPositionHistory },
  //   { equipmentBasicData },
  //   { equipmentModel },
  //   { equipmentState },
  //   { equipmentStateHistory },
  //   loading,
  //   error
  // );

  useEffect(() => {
    const basicEquipmentData = equipmentBasicData.map((equipment) => {
      return {
        id: equipment.id,
        name: equipment.name,
      };
    });

    const equipmentWithLastPosition = equipmentPositionHistory.map((equipment, index) => {
      return {
        ...basicEquipmentData[index],
        lastKnownPosition:
          equipment.positions?.length > 0 ? [equipment.positions[0].lat, equipment.positions[0].lon] : null,
      };
    });

    setMarkers(equipmentWithLastPosition);
    console.log({ equipmentWithLastPosition });
  }, [equipmentBasicData, equipmentPositionHistory]);

  // equipmentBasicData
  // {
  //   "id": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
  //   "equipmentModelId": "a3540227-2f0e-4362-9517-92f41dabbfdf",
  //   "name": "CA-0001"
  // }

  // equipmentPositionHistory
  // {
  //   "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
  //   "positions": [
  //       {
  //           "date": "2021-02-01T03:00:00.000Z",
  //           "lat": -19.126536,
  //           "lon": -45.947756
  //       },

  //   ]
  // }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <MapContainer center={[-19.126536, -45.947756]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Fragment key={marker.id}>
          <Marker position={marker.lastKnownPosition} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        </Fragment>
      ))}
    </MapContainer>
  );
}