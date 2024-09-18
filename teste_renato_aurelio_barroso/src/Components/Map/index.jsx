import { useEffect, useState } from "react";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";

import { getModelIcon, getLastArrayEntry } from "../../helpers/functions";

import * as S from "./style";

const MapSection = ({
  equipmentArray,
  statusMap,
  selectedEquip,
  selectedEquipHandler,
  renderType,
}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const map = useMap();

  const getBoundsCoordinates = posArray => {
    const bounds = { south: null, north: null, west: null, east: null };

    posArray.forEach(pos => {
      if (bounds.south === null || pos.lat < bounds.south)
        bounds.south = pos.lat;

      if (bounds.north === null || pos.lat > bounds.north)
        bounds.north = pos.lat;

      if (bounds.west === null || pos.lon < bounds.west) bounds.west = pos.lon;

      if (bounds.east === null || pos.lon > bounds.east) bounds.east = pos.lon;
    });

    return bounds;
  };

  const buildMarkerContentForLatestPosition = equipmentEntry => {
    let icon, latestStatusEntry, statusColor;
    icon = getModelIcon(equipmentEntry.modelId);
    latestStatusEntry = getLastArrayEntry(equipmentEntry.statusHistory);
    statusColor = statusMap.get(latestStatusEntry.equipmentStateId).color;

    return (
      <S.Marker id={equipmentEntry.name} color={statusColor} size={60}>
        <div className="pin">
          <span className="material-symbols-rounded">{icon}</span>
        </div>
        <div className="beacon"></div>
      </S.Marker>
    );
  };

  const buildMarkerContentForPositionHistory = (
    equipmentEntry,
    index,
    totalPositions
  ) => {
    let icon;
    icon = getModelIcon(equipmentEntry.modelId);

    if (index === totalPositions) {
      return (
        <S.Marker
          id={`${equipmentEntry.name}-${index}`}
          color={"var(--medium-grey)"}
          size={60}
        >
          <div className="pin">
            <span className="material-symbols-rounded">{icon}</span>
          </div>
        </S.Marker>
      );
    } else {
      return (
        <S.Marker
          id={`${equipmentEntry.name}-${index}`}
          color={"var(--medium-grey)"}
          size={4 + 20 * (index / totalPositions)}
        >
          <div className="dot"></div>
        </S.Marker>
      );
    }
  };

  const focusCameraOnEquipment = equipmentEntry => {
    const latestPos = getLastArrayEntry(equipmentEntry.positionHistory);
    map.panTo({ lat: latestPos.lat, lng: latestPos.lon });
    map.setZoom(14);
  };

  const drawEquipmentRoute = equipmentEntry => {
    let startPoint,
      endPoint,
      wayPoints = [];

    equipmentEntry.positionHistory.forEach((pos, i) => {
      if (i === 0) {
        startPoint = { lat: pos.lat, lng: pos.lon };
      } else if (i === equipmentEntry.positionHistory.length - 1) {
        endPoint = { lat: pos.lat, lng: pos.lon };
      } else {
        wayPoints.push({
          location: { lat: pos.lat, lng: pos.lon },
          stopover: true,
        });
      }
    });
  };

  const deselectEquipmentMarker = () => {
    if (selectedMarker !== null) {
      selectedMarker.classList.remove("selected");
    }
  };

  const selectEquipment = (markerEl, equipmentEntry) => {
    if (markerEl === selectedMarker) return;

    deselectEquipmentMarker();
    setSelectedMarker(markerEl);
    selectedEquipHandler(equipmentEntry);
    focusCameraOnEquipment(equipmentEntry);
  };

  const renderLatestPositions = () => {
    return equipmentArray.map(equip => {
      const lastPosition = getLastArrayEntry(equip.positionHistory);

      return (
        <AdvancedMarker
          key={equip.name}
          position={{ lat: lastPosition.lat, lng: lastPosition.lon }}
          onClick={e => selectEquipment(e.domEvent.target, equip)}
        >
          {buildMarkerContentForLatestPosition(equip)}
        </AdvancedMarker>
      );
    });
  };

  const renderPositionHistory = () => {
    return selectedEquip?.positionHistory?.map((pos, i) => {
      return (
        <AdvancedMarker
          key={pos.date}
          position={{ lat: pos.lat, lng: pos.lon }}
        >
          {buildMarkerContentForPositionHistory(
            selectedEquip,
            i,
            selectedEquip.positionHistory.length - 1
          )}
        </AdvancedMarker>
      );
    });
  };

  useEffect(() => {
    if (equipmentArray.length === 0 || !map) return;

    if (equipmentArray.length === 1) {
      return;
    }

    let pos = equipmentArray.map(equip =>
      getLastArrayEntry(equip.positionHistory)
    );
    map.fitBounds(getBoundsCoordinates(pos));
  }, [equipmentArray, map]);

  useEffect(() => {
    if (selectedMarker) {
      selectedMarker.classList.add("selected");
    }
  }, [selectedMarker]);

  useEffect(() => {
    if (!selectedEquip) {
      deselectEquipmentMarker();
      setSelectedMarker(null);
    } else {
      const markerEl = document.getElementById(selectedEquip.name);
      selectEquipment(markerEl, selectedEquip);
    }
  }, [selectedEquip]);

  useEffect(() => {
    if (!selectedEquip) return;

    if (renderType === 1) {
      deselectEquipmentMarker();
      drawEquipmentRoute(selectedEquip);
    }
  }, [selectedEquip, renderType]);

  return (
    <S.Map>
      <Map
        mapId={"equipment_map"}
        streetViewControl={false}
        fullscreenControl={false}
        minZoom={3}
        restriction={{
          strictBounds: true,
          latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
        }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={3}
      >
        {renderType === 0 ? renderLatestPositions() : renderPositionHistory()}
        {/* <Directions /> */}
      </Map>
    </S.Map>
  );
};

export default MapSection;

// function Directions() {
//   const map = useMap();
//   const routesLibrary = useMapsLibrary("routes");
//   const [directionsService, setDirectionsService] = useState();
//   const [directionsRenderer, setDirectionsRenderer] = useState();

//   useEffect(() => {
//     if (!routesLibrary || !map) return;
//     setDirectionsService(new routesLibrary.DirectionsService());
//     setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
//   }, [routesLibrary, map]);

//   useEffect(() => {
//     if (!directionsService || !directionsRenderer) return;

//     directionsService
//       .route({
//         origin: "100 Front St, Toronto ON",
//         destination: "500 College St, Toronto ON",
//         travelMode: google.maps.TravelMode.DRIVING,
//       })
//       .then(response => directionsRenderer.setDirections(response));
//   }, [directionsService, directionsRenderer]);

//   return null;
// }
