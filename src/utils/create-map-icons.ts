import { icon } from "leaflet";

export function createCustomIcon(model: string) {
  const image =
    model == "Harvester"
      ? "/icons/harvester.png"
      : model == "Garra traçadora"
        ? "/icons/garra-tracadora.png"
        : "/icons/caminhao-de-carga.png";

  return icon({
    iconUrl: image,
    iconSize: [50, 50],
    iconAnchor: [15, 15], // point of the image that will be aligned with the marker position
    popupAnchor: [0, -15], // Where the popup will be displayed, in relation to the icon
  });
}

export function createPostIcon() {
  return icon({
    iconUrl: "/icons/maintenance.png",
    iconSize: [30, 30],
    iconAnchor: [15, 15], // point of the image that will be aligned with the marker position
    popupAnchor: [0, -15], // Where the popup will be displayed, in relation to the icon
  });
}
