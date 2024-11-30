import { EquipmentModel } from "@/types/equipment.type";
import { icon } from "leaflet";
import { EquipmentsEnum } from "./enums/equipments.enums";
import { Icons } from "./constants/icons";

interface CreateCustomProps {
  model?: string;
  typeMarker?: "init" | "current";
  size?: number;
}
export function createCustomIcon({
  model,
  typeMarker,
  size = 50,
}: CreateCustomProps) {
  let image = "";
  if (model) image = getIconByModel({ modelName: model });
  if (typeMarker) {
    image =
      typeMarker === "current" ? Icons.CurrentLocation : Icons.StartLocation;
  }
  return icon({
    iconUrl: image,
    iconSize: [size, size],
    iconAnchor: [15, 30], // point of the image that will be aligned with the marker position
    popupAnchor: [0, -15], // Where the popup will be displayed, in relation to the icon
  });
}

export function createPostIcon() {
  return icon({
    iconUrl: Icons.MaintenancePost,
    iconSize: [25, 25],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
}

interface IGetIconByModel {
  modelName?: string;
  model?: EquipmentModel;
}
export function getIconByModel({ modelName, model }: IGetIconByModel): string {
  let equipmentName: string = EquipmentsEnum.TRUCK;

  if (model) equipmentName = model.name;
  if (modelName) equipmentName = modelName;

  return equipmentName == EquipmentsEnum.HARVESTER
    ? Icons.Harvester
    : equipmentName == EquipmentsEnum.TRACERS
      ? Icons.Tracers
      : Icons.Truck;
}
