import { icon } from "leaflet";

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

  if (model) {
    image =
      model == "Harvester"
        ? "/icons/harvester.png"
        : model == "Garra traçadora"
          ? "/icons/garra-tracadora.png"
          : "/icons/caminhao-de-carga.png";
  }

  if (typeMarker) {
    image = typeMarker === "current" ? "/icons/current.png" : "/icons/init.png";
  }
  return icon({
    iconUrl: image,
    iconSize: [size, size],
    iconAnchor: [15, 30], // point of the image that will be aligned with the marker position
    popupAnchor: [0, -15], // Where the popup will be displayed, in relation to the icon
  });
}

export function createCustomOlIcon({ model, typeMarker }: CreateCustomProps) {
  let image = "";

  if (model) {
    image =
      model == "Harvester"
        ? "/icons/harvester.png"
        : model == "Garra traçadora"
          ? "/icons/garra-tracadora.png"
          : "/icons/caminhao-de-carga.png";
  }

  if (typeMarker) {
    image = typeMarker === "current" ? "/icons/current.png" : "/icons/init.png";
  }
  return image;
}

export function createPostIcon() {
  return icon({
    iconUrl: "/icons/maintenance.png",
    iconSize: [25, 25],
    iconAnchor: [15, 15], // point of the image that will be aligned with the marker position
    popupAnchor: [0, -15], // Where the popup will be displayed, in relation to the icon
  });
}
