import { useEffect, useRef, useState } from "react";
import { Map, View, Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { Icon, Style, Stroke, Text } from "ol/style";
import { fromLonLat } from "ol/proj";
import {
  MainContainer,
  MapContainer,
  Tooltip,
  ResetButton,
} from "@/styles/views/homeMap";
import "ol/ol.css";

import equipment from "../../../public/data/equipment.json";
import equipmentPositionHistory from "../../../public/data/equipmentPositionHistory.json";
import equipmentModel from "../../../public/data/equipmentModel.json";
import equipmentState from "../../../public/data/equipmentState.json";
import equipmentStateHistory from "../../../public/data/equipmentStateHistory.json";

interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

interface Position {
  lon: number;
  lat: number;
  date: string;
}

interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

interface StateHistory {
  date: string;
  equipmentStateId: string;
}

interface EquipmentStateHistory {
  equipmentId: string;
  states: StateHistory[];
}

export default function HomeMap() {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const tooltipElement = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );
  const vectorSource = useRef(new VectorSource()).current;
  const historyVectorSource = useRef(new VectorSource()).current;
  const routeVectorSource = useRef(new VectorSource()).current;

  const getLastPosition = (positions: Position[]) => {
    return positions.reduce((last, current) =>
      new Date(last.date) > new Date(current.date) ? last : current
    );
  };

  const getLastState = (states: StateHistory[]) => {
    return states.reduce((last, current) =>
      new Date(last.date) > new Date(current.date) ? last : current
    );
  };

  const renderInitialPins = () => {
    vectorSource.clear();
    equipment.forEach((equip: Equipment) => {
      const equipPositions = equipmentPositionHistory.find(
        (pos: EquipmentPositionHistory) => pos.equipmentId === equip.id
      )?.positions;
      const equipStateHistories = equipmentStateHistory.find(
        (stateHistory: EquipmentStateHistory) =>
          stateHistory.equipmentId === equip.id
      )?.states;

      if (equipPositions && equipStateHistories) {
        const lastPosition = getLastPosition(equipPositions);
        const lastState = getLastState(equipStateHistories);

        const equipModel = equipmentModel.find(
          (model) => model.id === equip.equipmentModelId
        );
        const equipState = equipmentState.find(
          (state) => state.id === lastState.equipmentStateId
        );

        const feature = new Feature({
          geometry: new Point(fromLonLat([lastPosition.lon, lastPosition.lat])),
          equipmentName: equip.name,
          modelName: equipModel ? equipModel.name : "Unknown Model",
          stateName: equipState ? equipState.name : "Unknown State",
          id: equip.id,
        });

        feature.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scale: 0.05,
              color: "#000000",
            }),
          })
        );

        vectorSource.addFeature(feature);
      }
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    mapRef.current?.addLayer(vectorLayer);
  };

  const renderHistoryPins = (positions: Position[]) => {
    historyVectorSource.clear();
    routeVectorSource.clear();

    positions.forEach((pos, index) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([pos.lon, pos.lat])),
        isHistory: true,
        equipmentName: selectedEquipmentId
          ? equipment.find((e) => e.id === selectedEquipmentId)?.name ||
            "Unknown"
          : "Unknown",
        modelName: selectedEquipmentId
          ? equipmentModel.find(
              (model) =>
                model.id ===
                equipment.find((e) => e.id === selectedEquipmentId)
                  ?.equipmentModelId
            )?.name || "Unknown Model"
          : "Unknown Model",
        stateName: selectedEquipmentId
          ? equipmentState.find(
              (state) =>
                state.id ===
                getLastState(
                  equipmentStateHistory.find(
                    (e) => e.equipmentId === selectedEquipmentId
                  )?.states || []
                )?.equipmentStateId
            )?.name || "Unknown State"
          : "Unknown State",
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05,
          }),
          text: new Text({
            text: `${index + 1}`,
            offsetY: -15,
            font: "bold 12px sans-serif",
            stroke: new Stroke({ color: "#fff", width: 3 }),
          }),
        })
      );

      historyVectorSource.addFeature(feature);
    });

    const coordinates = positions.map((pos) => fromLonLat([pos.lon, pos.lat]));
    const routeFeature = new Feature({
      geometry: new LineString(coordinates),
    });
    routeFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "#FF0000",
          width: 2,
        }),
      })
    );

    routeVectorSource.addFeature(routeFeature);

    mapRef.current?.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer && layer.getSource() === vectorSource) {
        mapRef.current?.removeLayer(layer);
      }
    });

    const historyVectorLayer = new VectorLayer({
      source: historyVectorSource,
    });
    mapRef.current?.addLayer(historyVectorLayer);

    const routeVectorLayer = new VectorLayer({
      source: routeVectorSource,
    });
    mapRef.current?.addLayer(routeVectorLayer);
  };

  useEffect(() => {
    if (mapElement.current && !mapRef.current) {
      // Inicializa o mapa
      mapRef.current = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([-45.947756, -19.126536]),
          zoom: 5,
        }),
      });

      renderInitialPins();

      if (tooltipElement.current) {
        const tooltip = new Overlay({
          element: tooltipElement.current,
          offset: [10, 0],
          positioning: "center-left",
        });
        mapRef.current.addOverlay(tooltip);

        mapRef.current.on("pointermove", (event) => {
          const feature = mapRef.current?.forEachFeatureAtPixel(
            event.pixel,
            (feat) => feat
          );
          if (feature) {
            const coordinates = (
              feature.getGeometry() as Point
            ).getCoordinates();
            tooltip.setPosition(coordinates);
            tooltipElement.current!.innerHTML = `
              Equipamento: ${feature.get("equipmentName")}<br>
              Nome: ${feature.get("modelName")}<br>
              Estado: ${feature.get("stateName")}
            `;
            tooltipElement.current!.style.display = "block";
          } else {
            tooltipElement.current!.style.display = "none";
          }
        });

        mapRef.current.on("click", (event) => {
          const feature = mapRef.current?.forEachFeatureAtPixel(
            event.pixel,
            (feat) => feat
          );
          if (feature) {
            const equipmentId = feature.get("id");
            const equipPositions = equipmentPositionHistory.find(
              (pos: EquipmentPositionHistory) => pos.equipmentId === equipmentId
            )?.positions;

            if (equipPositions) {
              renderHistoryPins(equipPositions);
              setSelectedEquipmentId(equipmentId);
            }
          }
        });
      }
    }
  }, [
    selectedEquipmentId,
    vectorSource,
    historyVectorSource,
    routeVectorSource,
  ]);

  const handleReset = () => {
    setSelectedEquipmentId(null);
    historyVectorSource.clear();
    routeVectorSource.clear();
    renderInitialPins();
  };

  return (
    <MainContainer>
      <MapContainer ref={mapElement}></MapContainer>
      <Tooltip ref={tooltipElement}></Tooltip>
      <ResetButton onClick={handleReset} disabled={!selectedEquipmentId}>
        Redefinir
      </ResetButton>
    </MainContainer>
  );
}
