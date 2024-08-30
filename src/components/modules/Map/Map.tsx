import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import equipmentPositionHistoryData from "../../../data/equipmentPositionHistory.json";
import equipmentStateHistoryData from "../../../data/equipmentStateHistory.json";
import equipmentStatesData from "../../../data/equipmentState.json";
import equipmentModelData from "../../../data/equipmentModel.json"
import equipmentData from "../../../data/equipment.json"

import operational from "../../../assets/icons/Truck_8.png";
import maintenance from "../../../assets/icons/Truck_11.png";
import stoped from "../../../assets/icons/Bus_12.png";

import { Button, Modal } from "react-bootstrap";

import "./Map.scss";

const MAP_STYLE: React.CSSProperties = {
  width: "80%",
  height: "500px",
  borderRadius: '5px'
};

const API_KEY: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map: React.FC = () => {
  interface StateInfo {
    id: string;
    name: string;
    color: string;
  }

  interface StateHistory {
    date: string;
    state: StateInfo;
  }

  interface EquipmentState {
    name: string;
    id: string;
    color: string;
    statesHistory: StateHistory[];
  }
  interface StateAttributes {
    name: string;
    id: string;
    color: string;
  }

  type EquipmentModelEntry = {
    id: string;
    name: string;
    hourlyEarnings: {
      equipmentStateId: string;
      value: number;
    }[];
  };

  const [centerCoords, setCenterCoords] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const [isHovered, setIsHovered] = useState<string>("");
  const [historyModal, setHistoryModal] = useState<boolean>(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<EquipmentState>({
    id: "",
    name: "",
    color: "",
    statesHistory: [],
  });

  const { isLoaded }: { isLoaded: boolean } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: API_KEY as string,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  function handleClick(
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    label: string,
    stateAttrs: StateAttributes,
    markerId: string
  ): (() => void) | void {
    if (!mapRef.current) return;

    const equipmentDatails = getEquipmentDetails(markerId);

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const marker = new google.maps.Marker({
      position,
      map: mapRef.current,
      icon: {
        url: equipmentDatails.icon,
        scaledSize: new google.maps.Size(50, 50),
        anchor: new google.maps.Point(25, 25),
      },
    });

    markerRef.current = marker;

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="info-window-container">
          <div style="font-size: 15px; text-align: center;">${equipmentDatails.equipmentModel.name}</div>
          <div style="font-size: 20px; text-align: center;">${stateAttrs.name}</div>
          <div style="font-size: 12px; text-align: center; margin-top: 3px">Produtividade em 24h: ${equipmentDatails.productivity}</div>
          <div style="font-size: 12px; text-align: center; margin-top: 3px">Total de ganhos em 24h: ${equipmentDatails.totalEarnings}</div>
          <div style="padding: 10px; text-align: center;">${label}</div>
          <button id="open-modal-button-${markerId}" class="custom-button">
            Histórico completo
          </button>
        </div>
      `,
    });

    infoWindowRef.current = infoWindow;

    infoWindow.open(marker.getMap(), marker);

    marker.addListener("click", () => {
      infoWindow.open(marker.getMap(), marker);
    });

    google.maps.event.addListenerOnce(infoWindow, "domready", () => {
      const button = document.getElementById(`open-modal-button-${markerId}`);
      if (button) {
        button.addEventListener("click", () => {
          setSelectedMarkerId(markerId);
          setHistoryModal(true);
        });
      }
    });

    const equipmentStates = getEquipmentStatesHistory(markerId);
    setModalContent(equipmentStates);

    return () => {
      marker.setMap(null);
      infoWindow.close();
    };
  }

  function averageGeolocation(): { latitude: number; longitude: number } {
    const coords = equipmentPositionHistoryData.map((history) => {
      const lastPosition = history.positions[history.positions.length - 1];
      return { lat: lastPosition.lat, lon: lastPosition.lon };
    });
  
    if (coords.length === 1) {
      return {
        latitude: coords[0].lat,
        longitude: coords[0].lon,
      };
    }
  
    let x = 0;
    let y = 0;
    let z = 0;
  
    coords.forEach(({ lat, lon }) => {
      const latitude = (lat * Math.PI) / 180;
      const longitude = (lon * Math.PI) / 180;
  
      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    });
  
    const total = coords.length;
  
    x /= total;
    y /= total;
    z /= total;
  
    const centralLongitude = Math.atan2(y, x);
    const centralSquareRoot = Math.sqrt(x * x + y * y);
    const centralLatitude = Math.atan2(z, centralSquareRoot);
  
    const result = {
      latitude: (centralLatitude * 180) / Math.PI,
      longitude: (centralLongitude * 180) / Math.PI,
    };
  
    setCenterCoords({
      lat: result.latitude,
      lng: result.longitude,
    });
  
    return result;
  }
  

  useEffect(() => {
    if (equipmentPositionHistoryData && isLoaded) {
      const center = averageGeolocation();
      if (mapRef.current) {
        mapRef.current.setCenter({
          lat: center.latitude,
          lng: center.longitude,
        });
      }
    }
  }, [equipmentPositionHistoryData, isLoaded]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  type EquipmentStateHistoryEntry = {
    date: string;
    equipmentStateId: string;
  };

  function calculateTotalHours(
    equipmentData: EquipmentStateHistoryEntry[],
    targetStateId: string
  ): number {
    // Ordena os dados por data em ordem decrescente
    const sortedData = equipmentData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const now = new Date(sortedData[0].date);  // Considera a data mais recente disponível nos dados
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    let totalHours = 0;
    let lastDate = now;

    for (let i = 0; i < sortedData.length; i++) {
      const entryDate = new Date(sortedData[i].date);

      if (entryDate < twentyFourHoursAgo) {
        // Se a data de entrada for antes do limite de 24 horas, calcula o tempo restante e termina o loop
        const hoursDifference = (lastDate.getTime() - twentyFourHoursAgo.getTime()) / (1000 * 60 * 60);
        if (sortedData[i - 1]?.equipmentStateId === targetStateId) {
          totalHours += hoursDifference;
        }
        break;
      }

      // Calcula a diferença de horas entre esta entrada e a anterior
      const hoursDifference = (lastDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60);

      if (sortedData[i].equipmentStateId === targetStateId) {
        totalHours += hoursDifference;
      }

      lastDate = entryDate;
    }

    return totalHours;
  }

  type EquipmentModel = {
    id: string;
    name: string;
    hourlyEarnings: {
      equipmentStateId: string;
      value: number;
    }[]
  };
  
  type StateHours = {
    id: string;
    name: string;
    hours: number;
  };
  
  function calculateTotalEarnings(
    stateHours: StateHours[],
    equipmentModel: EquipmentModel
  ): string {

    const earningsMap = new globalThis.Map<string, number>();

    equipmentModel.hourlyEarnings.forEach(earning => {
      earningsMap.set(earning.equipmentStateId, earning.value);
    });

    let totalEarnings = 0;
  
    stateHours.forEach(state => {
      const hourlyRate = earningsMap.get(state.id) || 0;
      totalEarnings += state.hours * hourlyRate;
    });

    let BRLCurrency = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return BRLCurrency.format(totalEarnings);
  }

  type StateHoursEntry = {
    id: string;
    hours: number;
    name: string;
  };

  function calculateProductivity(
    stateHours: StateHoursEntry[],
  ): string {

    const operationalHours = stateHours.filter(hours => hours.name === "Operando")

    const calculateProductivity = ((operationalHours[0].hours / 24) * 100 ).toFixed() + '%'

    return calculateProductivity
  }
  
  function getEquipmentDetails(id: string) {

    const equipment = equipmentData.filter(equipment => equipment.id === id);
    const equipmentModel: EquipmentModelEntry[] = equipmentModelData.filter(model => model.id === equipment[0].equipmentModelId)
    const equipModelHourEarningsById = new Set(equipmentModel[0].hourlyEarnings.map(hours => hours.equipmentStateId));
    const equipmentStateHistory = equipmentStateHistoryData.filter(state =>
      state.states.some(item => equipModelHourEarningsById.has(item.equipmentStateId))
    );
    
    const allStates: EquipmentStateHistoryEntry[] = equipmentStateHistory
    .flatMap(history => history.states);
    const uniqueStateIds = Array.from(new Set(allStates.map(state => state.equipmentStateId)));
    const hoursByStateId: { [key: string]: number } = {};

    const icon =
    equipmentModel[0].name === "Caminhão de carga"
      ? operational
      : equipmentModel[0].name === "Harvester"
      ? maintenance
      : equipmentModel[0].name === "Garra traçadora"
      ? stoped
      : "";
    
    const stateHoursRelationDetails = uniqueStateIds.map(stateId => {
      const stateName = equipmentStatesData.find(stateData => stateData.id === stateId)?.name || 'Unknown';
      hoursByStateId[stateId] = calculateTotalHours(allStates, stateId);
      
      return {
        id: stateId,
        name: stateName,
        hours: hoursByStateId[stateId]
      };
    });

    const totalEarnings = calculateTotalEarnings(stateHoursRelationDetails, equipmentModel[0]);
    const productivity = calculateProductivity(stateHoursRelationDetails);

    if (!stateHoursRelationDetails || !equipmentModel) {
      return {
        hourDetails: {
          id: 'unknown',
          name: 'unknown',
          hours: 0,
        },
        equipmentModel: {
          id: 'unknown',
          name: 'unknown',
          hourlyEarnings: {
            equipmentStateId: 'unknown',
            value: 0,
          }
        },
        productivity: 'unknown',
        totalEarnings: 'unknown',
        icon: 'unknown'
      }
    }

    return {
      hourDetails: stateHoursRelationDetails,
      equipmentModel: equipmentModel[0],
      productivity: productivity,
      totalEarnings: totalEarnings,
      icon: icon
    }
  }

  function getEquipmentStatesHistory(id: string): EquipmentState {
    const history = equipmentStateHistoryData.find(
      (history) => history.equipmentId === id
    );
    if (!history) {
      return {
        name: "Unknown",
        id: "unknown-id",
        color: "#ccc",
        statesHistory: [],
      };
    }

    const statesHistory = history.states.map((state) => {
      const stateInfo = equipmentStatesData.find(
        (s) => s.id === state.equipmentStateId
      );
      return {
        date: state.date,
        state: stateInfo || {
          id: state.equipmentStateId,
          name: "Unknown",
          color: "#ccc",
        },
      };
    });

    const lastStateId =
      history.states.length > 0
        ? history.states[history.states.length - 1].equipmentStateId
        : "";
    const findEquipmentStateById = equipmentStatesData.find(
      (state) => state.id === lastStateId
    );

    if (!findEquipmentStateById) {
      return {
        name: "Unknown",
        id: "unknown-id",
        color: "#ccc",
        statesHistory,
      };
    }

    return {
      name: findEquipmentStateById.name,
      id: findEquipmentStateById.id,
      color: findEquipmentStateById.color,
      statesHistory,
    };
  }

  if (!API_KEY) {
    alert("API key is missing.");
    return null;
  }

  return (
    <div className="map-container">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={MAP_STYLE}
          center={centerCoords}
          zoom={10}
          onLoad={onLoad}
        >
          <div className="marker-container">
            {mapRef.current &&
              isLoaded &&
              equipmentPositionHistoryData.length > 0 &&
              equipmentPositionHistoryData.map((history, index) => {
                const positionId = history.equipmentId;
                const lastPosition = history.positions[history.positions.length - 1];
                const equipmentStates = getEquipmentStatesHistory(positionId);
                const equipmentDatails = getEquipmentDetails(positionId);
                const date = new Date(lastPosition.date);
                const lastPositionCoords = {
                  lat: lastPosition.lat,
                  lng: lastPosition.lon,
                };

                return (
                  <Fragment>
                    <Marker
                      position={lastPositionCoords}
                      onMouseOver={() => setIsHovered(positionId)}
                      onMouseOut={() => setIsHovered("")}
                      onClick={() =>
                        handleClick(
                          lastPositionCoords,
                          date.toLocaleDateString("pt-BR"),
                          equipmentStates,
                          positionId
                        )
                      }
                      icon={{
                        url: equipmentDatails.icon,
                        scaledSize: new google.maps.Size(
                          isHovered === positionId ? 60 : 50,
                          isHovered === positionId ? 60 : 50
                        ),
                        anchor: new google.maps.Point(25, 25),
                      }}
                    />

                    <Modal
                      backdropClassName="custom-modal-backdrop"
                      onBackdropClick={() => setHistoryModal(false)}
                      show={historyModal}
                      onHide={() => setHistoryModal(false)}
                      size="lg"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Histórico do equipamento</Modal.Title>
                        <p>{modalContent.statesHistory.length + 1} Ocorrências</p>
                      </Modal.Header>
                      <Modal.Body
                        style={{ maxHeight: "400px", overflowY: "auto" }}
                      >
                        {modalContent.statesHistory.map(
                          ({ date, state }, index) => (
                            <p key={state.id}>
                              Estado: {state.name} <br />
                              Na data:{" "}
                              {new Date(date).toLocaleDateString(
                                "pt-BR"
                              )} às{" "}
                              {new Date(date).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          )
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        {/* <p>{equipmentDatails.hourDetails}</p> */}
                        <Button
                          onClick={() => setHistoryModal(false)}
                          variant="secondary"
                        >
                          Fechar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Fragment>
                );
              })}
          </div>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Map;
