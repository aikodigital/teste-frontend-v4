import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { usePositionsHistory } from "../../hooks/usePositionshistory";
import { Button, ContainerPopUp, Content, ContinerIcon } from "./styles";
import Truck from "../../content/img/truck.png";
import Tractor from "../../content/img/tractor.png";
import Vehicle from "../../content/img/vehicle.png";
import Logo from "../../content/img/aiko.png";

const center: LatLngExpression = [-15.0, -56.0];

const MapView: React.FC = () => {
  const mapRef = useRef<L.Map>(null);
  const [panelExpanded, setPanelExpanded] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any | null>(null);

  const { getAllModelsByTheMostRecentTime } = usePositionsHistory();

  const handleMarkerClick = (equipment: any) => {
    setSelectedEquipment(equipment);
  };

  const objectOfRecentPositions = getAllModelsByTheMostRecentTime();

  useEffect(() => {
    if (mapRef.current && objectOfRecentPositions.models.length > 0) {
      const bounds = L.latLngBounds(
        objectOfRecentPositions.models.map((equipment) => [
          equipment.position.lat,
          equipment.position.lon,
        ])
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [objectOfRecentPositions.models]);

  return (
    <Content>
      <div>
        <div>
          <img src={Logo} alt="logo" width={200} height={100} />
          <p>Localize os seus equipamentos</p>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <MapContainer
          style={{ height: "80vh", width: "100%" }}
          zoom={10}
          center={center}
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {objectOfRecentPositions.models.map((equipment) => (
            <Marker
              key={equipment.equipmentId}
              position={[equipment.position.lat, equipment.position.lon]}
              eventHandlers={{
                click: () => handleMarkerClick(equipment),
              }}
              icon={
                new L.Icon({
                  iconUrl: require("leaflet/dist/images/marker-icon.png"),
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup autoPan={true}>
                <div>
                  <strong>ID:</strong> {equipment.equipmentId} <br />
                  <ContinerIcon>
                    <strong>Tipo:</strong> {equipment.type.name} <br />
                    <img
                      src={
                        equipment.type.name.some((type) =>
                          type.includes("Caminhão")
                        )
                          ? Truck
                          : equipment.type.name.some((type) =>
                              type.includes("Harvester")
                            )
                          ? Tractor
                          : Vehicle
                      }
                      alt="tipo de equipamento"
                      width={25}
                      height={25}
                    />
                  </ContinerIcon>
                  <strong>Estado Atual:</strong>{" "}
                  {equipment.stateForTime?.stateName.map((state) => state.name)}
                  <br />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <ContainerPopUp
          style={{
            width: panelExpanded ? "auto" : "auto",
            height: panelExpanded ? "700px" : "120px",
          }}
        >
          <Button
            onClick={() => setPanelExpanded(!panelExpanded)}
            style={{ marginBottom: "10px" }}
          >
            <p className="troggle-button">
              {panelExpanded ? "Diminuir" : "Expandir"}
            </p>
          </Button>

          {selectedEquipment ? (
            <>
              <strong className="title">Histórico de estados:</strong>
              <span>
                <strong>Equipamento:</strong> {selectedEquipment.type.name}
              </span>
              {selectedEquipment.historyOfState?.state.map(
                (state: any, index: number) => (
                  <div key={index}>
                    <span>
                      <strong>Estado:</strong> {state.stateName}{" "}
                    </span>
                    <span>
                      <strong>Data:</strong>{" "}
                      {new Date(state.date).toLocaleString()}
                    </span>
                  </div>
                )
              )}
            </>
          ) : (
            <p>Nenhum equipamento selecionado</p>
          )}
        </ContainerPopUp>
      </div>
    </Content>
  );
};

export default MapView;
