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
import {
  Equipment,
  EquipmentPositionHistory,
  EquipmentStateHistory,
  Position,
  StateHistory,
} from "@/app/interfaces";

import equipment from "../../../public/data/equipment.json";
import equipmentPositionHistory from "../../../public/data/equipmentPositionHistory.json";
import equipmentModel from "../../../public/data/equipmentModel.json";
import equipmentState from "../../../public/data/equipmentState.json";
import equipmentStateHistory from "../../../public/data/equipmentStateHistory.json";

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

  const uniqueModels = Array.from(
    new Set(equipmentModel.map((model) => model.id))
  );

  const modelColorMap: { [key: string]: string } = {};
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#800080",
    "#FFA500",
    "#008000",
    "#000080",
  ];

  uniqueModels.forEach((modelId, index) => {
    modelColorMap[modelId] = colors[index % colors.length];
  });

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

        const equipColor =
          equipModel && modelColorMap[equipModel.id]
            ? modelColorMap[equipModel.id]
            : "#1d4692";

        const feature = new Feature({
          geometry: new Point(fromLonLat([lastPosition.lon, lastPosition.lat])),
          equipmentName: equip.name,
          modelName: equipModel ? equipModel.name : "Modelo Desconhecido",
          stateName: equipState ? equipState.name : "Estado Desconhecido",
          id: equip.id,
          type: "equipment",
        });

        const svgIcon = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="${equipColor}">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `;

        feature.setStyle(
          new Style({
            image: new Icon({
              src: "data:image/svg+xml;utf8," + encodeURIComponent(svgIcon),
              scale: 1,
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
      const relatedEquipment = equipment.find(
        (e) => e.id === selectedEquipmentId
      );
      const relatedModel = equipmentModel.find(
        (model) => model.id === relatedEquipment?.equipmentModelId
      );

      const stateHistory = equipmentStateHistory.find(
        (history) => history.equipmentId === selectedEquipmentId
      )?.states;

      const nearestState = stateHistory
        ?.filter((st) => new Date(st.date) <= new Date(pos.date))
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];

      const relatedState = equipmentState.find(
        (state) => state.id === nearestState?.equipmentStateId
      );

      const equipColor =
        relatedModel && modelColorMap[relatedModel.id]
          ? modelColorMap[relatedModel.id]
          : "#1d4692";

      const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="${equipColor}">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `;

      const feature = new Feature({
        geometry: new Point(fromLonLat([pos.lon, pos.lat])),
        isHistory: true,
        equipmentName: relatedEquipment?.name || "Equipamento Desconhecido",
        modelName: relatedModel ? relatedModel.name : "Modelo Desconhecido",
        stateName: relatedState ? relatedState.name : "Estado Desconhecido",
        date: pos.date,
        type: "history",
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: "data:image/svg+xml;utf8," + encodeURIComponent(svgIcon),
            scale: 1,
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
      type: "route",
    });
    routeFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "#1D4692",
          width: 1,
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
    if (!mapRef.current && mapElement.current) {
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

      if (mapRef.current) {
        const tooltip = new Overlay({
          element: tooltipElement.current!,
          offset: [15, 0],
          positioning: "center-left",
        });
        mapRef.current.addOverlay(tooltip);

        mapRef.current.on("pointermove", (event) => {
          const feature = mapRef.current?.forEachFeatureAtPixel(
            event.pixel,
            (feat) => feat
          );

          if (feature && feature.get("type") === "equipment") {
            const coordinates = (
              feature.getGeometry() as Point
            ).getCoordinates();
            tooltip.setPosition(coordinates);
            tooltipElement.current!.innerHTML = `
              Equipamento: ${feature.get("equipmentName")}<br>
              Modelo: ${feature.get("modelName")}<br>
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

          if (feature && feature.get("type") === "equipment") {
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
