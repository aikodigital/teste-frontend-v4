import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "./MapView.css";
import { getTruckIcon } from "../../utils/mapIcons";
import {
  buildStateSegments,
  getStateChangePoints,
  densifyHistory,
} from "../../utils/geoUtils";
import MapLegend from "../MapLegend/MapLegend";
import L from "leaflet";

/* =========================
   Helpers internos do mapa
========================= */

function MapController({ selectedEquipment }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEquipment?.position) {
      map.setView(
        [selectedEquipment.position.lat, selectedEquipment.position.lon],
        13
      );
    }
  }, [selectedEquipment, map]);

  return null;
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click() {
      onMapClick?.();
    },
  });

  return null;
}

function getStateChangeIcon(color) {
  return L.divIcon({
    className: "state-change-marker",
    html: `
      <div style="
        width: 10px;
        height: 10px;
        background: ${color};
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 4px rgba(0,0,0,0.6);
      "></div>
    `,
  });
}

/* =========================
        MAP VIEW
========================= */

function MapView({
  equipments,
  selectedEquipment,
  onMapClick,
  showHistory,
  equipmentStateMap,
  timelineIndex,
}) {
  const markerRefs = useRef({});

  // posição animada (timeline)
  const animatedPosition =
    selectedEquipment && timelineIndex !== null
      ? selectedEquipment.history[timelineIndex]
      : null;

  // histórico até o tempo atual
  const partialHistory =
    selectedEquipment && timelineIndex !== null
      ? selectedEquipment.history.slice(0, timelineIndex + 1)
      : selectedEquipment?.history;

  // histórico densificado (visual)
  const denseHistory = partialHistory ? densifyHistory(partialHistory) : [];

  // abre / fecha popups automaticamente
  useEffect(() => {
    Object.values(markerRefs.current).forEach((marker) =>
      marker?.closePopup?.()
    );

    if (selectedEquipment) {
      markerRefs.current[selectedEquipment.id]?.openPopup?.();
    }
  }, [selectedEquipment]);

  return (
    <MapContainer
      center={[-19.126536, -45.947756]}
      zoom={10}
      minZoom={6}
      maxZoom={18}
      className="map"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapController selectedEquipment={selectedEquipment} />
      <MapClickHandler onMapClick={onMapClick} />

      {/* TRAJETO COLORIDO POR ESTADO */}
      {showHistory &&
        denseHistory.length > 1 &&
        selectedEquipment?.stateHistory?.length &&
        equipmentStateMap &&
        buildStateSegments(
          denseHistory,
          selectedEquipment.stateHistory,
          equipmentStateMap
        ).map((segment, index) => (
          <Polyline
            key={index}
            positions={segment.points}
            pathOptions={{
              color: segment.color,
              weight: 4,
              opacity: 0.85,
            }}
          />
        ))}

      {/* PONTOS DE MUDANÇA DE ESTADO */}
      {showHistory &&
        denseHistory.length > 1 &&
        selectedEquipment?.stateHistory?.length &&
        equipmentStateMap &&
        getStateChangePoints(
          denseHistory,
          selectedEquipment.stateHistory,
          equipmentStateMap
        ).map((point, index) => (
          <Marker
            key={`state-change-${index}`}
            position={[point.lat, point.lon]}
            icon={getStateChangeIcon(point.state.color)}
          >
            <Popup>
              <strong>{point.state.name}</strong>
              <br />
              {new Date(point.date).toLocaleString()}
            </Popup>
          </Marker>
        ))}

      {/* MARKER ANIMADO (TIMELINE) */}
      {animatedPosition && (
        <Marker
          position={[animatedPosition.lat, animatedPosition.lon]}
          icon={getTruckIcon(selectedEquipment.state?.color, true)}
          zIndexOffset={2000}
        />
      )}

      {/* MARKERS FIXOS */}
      {equipments.map(
        (eq) =>
          eq.position &&
          (!selectedEquipment || eq.id !== selectedEquipment.id) && (
            <Marker
              key={eq.id}
              position={[eq.position.lat, eq.position.lon]}
              icon={getTruckIcon(eq.state?.color)}
              ref={(ref) => {
                if (ref) markerRefs.current[eq.id] = ref;
              }}
            >
              <Popup>
                <strong>{eq.name}</strong>
                <br />
                Estado:{" "}
                <span style={{ color: eq.state?.color }}>
                  {eq.state?.name || "Desconhecido"}
                </span>
              </Popup>
            </Marker>
          )
      )}

      <MapLegend />
    </MapContainer>
  );
}

export default MapView;
