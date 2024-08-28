import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Fragment, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useData } from "./context/DataContext";
import "./index.css";

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
  // equipmentPositionHistory,
  // { equipmentPositionHistory },
  // { equipmentBasicData }
  // { equipmentModel },
  // { equipmentState },
  // { equipmentStateHistory },
  // loading,
  // error
  // );

  const formatDate = (unformattedDateString) => {
    const date = new Date(unformattedDateString);

    const readableDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "America/Sao_Paulo",
    });

    return readableDate;
  };

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
          equipment.positions?.length > 0
            ? {
                coordinates: [equipment.positions[0].lat, equipment.positions[0].lon],
                date: equipment.positions[0].date,
              }
            : null,
      };
    });

    const equipmentWithLastState = equipmentStateHistory.map((equipment, index) => {
      const { name: stateName, color } = equipmentState.find(
        (equipmentState) => equipment.states[0].equipmentStateId === equipmentState.id
      );

      return {
        ...equipmentWithLastPosition[index],
        lastKnownState:
          equipment.states?.length > 0 ? { date: equipment.states[0].date, name: stateName, color } : null,
      };
    });

    console.log(equipmentWithLastState);

    setMarkers(equipmentWithLastState);
  }, [equipmentBasicData, equipmentPositionHistory, equipmentState, equipmentStateHistory]);

  // estou pegando a primeira posição e o primeiro estado, não os ultimos
  // colocar data da ultima posiçao

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

  // equipmentStateHistory
  // "equipmentId": "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
  // "states": [
  //     {
  //         "date": "2021-02-01T03:00:00.000Z",
  //         "equipmentStateId": "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f"
  //     },

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
          <Marker
            position={marker.lastKnownPosition.coordinates}
            icon={L.divIcon({
              html: `<div style="width: 38px; height: 38px; margin-top: -24px; margin-left: -14px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
                marker.lastKnownState.color ? marker.lastKnownState.color : "blue"
              }" width="38px" height="38px">
    <path d="M12 2C8.1 2 5 5.1 5 9c0 3.9 7 13 7 13s7-9.1 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
  </svg></div>`,
            })}
          >
            <Popup>
              <p>{marker.name}</p>
              <p>
                Latitude: {marker.lastKnownPosition.coordinates[0]}, longitude:{marker.lastKnownPosition.coordinates[1]}
                , data: {formatDate(marker.lastKnownPosition.date)}
              </p>
              <p>
                Estado: {marker.lastKnownState.name}, data: {formatDate(marker.lastKnownState.date)}
              </p>
            </Popup>
          </Marker>
        </Fragment>
      ))}
    </MapContainer>
  );
}
