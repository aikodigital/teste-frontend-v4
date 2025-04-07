import L from "leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

import equipmentModels from "../../data/equipmentModel.json";
import type { IEquipmentModel } from "../pages/map/interface/Imap";

const equipmentTypeColors: Record<string, string> = {
  "Caminhão de carga": "#ff0707",
  Harvester: "#00ff5e",
  "Garra traçadora": "#000a9c",
  default: "#9ca3af",
};

const equipmentModelsMap: Record<string, IEquipmentModel> =
  equipmentModels.reduce(
    (acc: Record<string, IEquipmentModel>, model: IEquipmentModel) => {
      acc[model.id] = model;
      return acc;
    },
    {},
  );

const createColoredMapPin = (color: string): L.DivIcon => {
  const svg = renderToStaticMarkup(
    <MapPin size={32} fill={color} stroke={color} />,
  );

  return L.divIcon({
    html: svg,
    className: "custom-map-pin",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export const getEquipmentIcon = (equipmentModelId: string): L.DivIcon => {
  const model = equipmentModelsMap[equipmentModelId];
  const color = model
    ? equipmentTypeColors[model.name] || equipmentTypeColors.default
    : equipmentTypeColors.default;
  return createColoredMapPin(color);
};

export const createDefaultIcon = (): L.DivIcon =>
  createColoredMapPin(equipmentTypeColors.default);
