/* eslint-disable react/react-in-jsx-scope */

import {
  APIProvider,
  InfoWindow,
  Map,
  Marker
} from "@vis.gl/react-google-maps";

import equipment from "../../../../data/equipment.json";
import equipmentModel from "../../../../data/equipmentModel.json";
import equipmentPositionHistory from "../../../../data/equipmentPositionHistory.json";
import equipmentState from "../../../../data/equipmentState.json";
import equipmentStateHistory from "../../../../data/equipmentStateHistory.json";
import "./styles.css";
import { useState } from "react";
import { ModalComponent } from "../Modal";
import { IEquipmentsData } from "../../interfaces";
import { Dropdown } from "primereact/dropdown";

const apiKey = "AIzaSyAzCCDrRobir6bjBap0nKkrhlHR89mcs3I";

export function MapComponent() {
  const [openInfoWindowId, setOpenInfoWindowId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(10); // Estado para controlar o nível de zoom
  const [openModalData, setOpenModalData] = useState<IEquipmentsData>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(null); // Estado para o tipo de veículo

  const vehicleTypes = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Caminhão de carga', value: 'Caminhão de carga' },
    { label: 'Harvester', value: 'Harvester' },
    { label: 'Garra traçadora', value: 'Garra traçadora' }
  ];

  const equipmentData: IEquipmentsData[] = equipment.map((e) => {
    const model = equipmentModel.find((em) => em.id === e.equipmentModelId);
    const positionHistory = equipmentPositionHistory.find(
      (ep) => ep.equipmentId === e.id
    );

    const stateHistory = equipmentStateHistory
      .find((epsh) => epsh.equipmentId === e.id)
      ?.states.map((stateEntry) => {
        const state = equipmentState.find(
          (es) => es.id === stateEntry.equipmentStateId
        );
        return {
          ...stateEntry,
          stateName: state ? state.name : "",
          stateColor: state ? state.color : ""
        };
      });

    const totalHours = 24; // Total de horas em um dia
    let productiveHours = 0;

    if (model && model.hourlyEarnings.length > 0) {
      model.hourlyEarnings.forEach((earning) => {
        // Encontrando o estado associado a essa entrada de hourlyEarnings
        const state = equipmentState.find(
          (es) => es.id === earning.equipmentStateId
        );

        // Verificando se o estado é o estado produtivo, ex: "Em operação"
        if (state && state.name === "Operando") {
          productiveHours += earning.value; // Soma as horas produtivas
        }
      });
    }

    // Cálculo da produtividade: horas produtivas / total de horas * 100
    const productivity =
      Number(totalHours) > 0 ? (productiveHours / totalHours) * 100 : 0;

    return {
      ...e,
      model,
      positionHistory,
      stateHistory: stateHistory
        ? {
          equipmentId: e.id,
          states: stateHistory
        }
        : undefined,
      productivity
    };
  });

  const filteredEquipmentData = selectedVehicleType && selectedVehicleType !== 'Todos'
    ? equipmentData.filter(e => e.model?.name === selectedVehicleType)
    : equipmentData;

  if (!apiKey) {
    return <div>Error: Missing Google Maps API Key</div>;
  }

  function getInfoWindowOffset(zoom: number) {
    if (zoom > 10) {
      return 0.02;
    } else if (zoom > 8) {
      return 0.06;
    } else if (zoom > 5) {
      return 0.09;
    } else {
      return 0.01;
    }
  }

  function closeModal() {
    setOpenModal(false);
  };

  return (
    <div className="map-container">
      <Dropdown
        value={selectedVehicleType}
        options={vehicleTypes}
        onChange={(e) => setSelectedVehicleType(e.value)}
        placeholder="Selecione o tipo de veículo"
        className="dropdown"
      />
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: -19.126536, lng: -46.092436 }}
          defaultZoom={10}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onZoomChanged={(event) => {
            const zoom = event.detail.zoom;
            setZoomLevel(zoom);
          }}
        >
          {filteredEquipmentData &&
            filteredEquipmentData.map((e) => {
              const lastHistoryPosition =
                e.positionHistory?.positions[
                e.positionHistory.positions.length - 1
                ];
              const lastStatePosition =
                e.stateHistory?.states[e.stateHistory?.states.length - 1];
              if (lastHistoryPosition) {
                return (
                  <>
                    <Marker
                      key={e.id}
                      position={{
                        lat: lastHistoryPosition?.lat,
                        lng: lastHistoryPosition?.lon
                      }}
                      label={{
                        text: e.name,
                        className: "margin-top"
                      }}
                      onClick={() => {
                        setOpenModalData(e);
                        setOpenModal(true);
                      }}
                      onMouseOver={() => setOpenInfoWindowId(e.id)}
                    />
                    {openInfoWindowId === e.id && (
                      <div className="padding-top margin-top">
                        <InfoWindow
                          key={e.id + Math.random().toString()}
                          position={{
                            lat:
                              lastHistoryPosition?.lat +
                              getInfoWindowOffset(zoomLevel),
                            lng: lastHistoryPosition?.lon
                          }}
                          onCloseClick={() => setOpenInfoWindowId(null)}
                          headerContent={e.name}
                          minWidth={200}
                        >
                          <hr />
                          <p>{ }</p>
                          <p className="title-item-info-window ">
                            Equipamento:
                          </p>
                          <p className="value-item-info-window margin-bottom-info-value">
                            {e.model?.name}
                          </p>
                          <p className="title-item-info-window">
                            Produtividade do equipamento(%):
                          </p>
                          <p className="value-item-info-window margin-bottom-info-value">
                            {e.productivity?.toFixed(2)}
                          </p>
                          <p className="title-item-info-window">Status:</p>
                          <p className="value-item-info-window">
                            {lastStatePosition?.stateName}
                            <span
                              className="show-color-status"
                              style={{
                                background: `${lastStatePosition?.stateColor}`
                              }}
                            ></span>
                          </p>
                        </InfoWindow>
                      </div>
                    )}
                  </>
                );
              }
            })}
          {
            openModal && openModalData && (
              <ModalComponent
                data={openModalData!}
                openModal={openModal}
                onClose={closeModal}
              />
            )
          }
        </Map>
      </APIProvider>
    </div>
  );
}
