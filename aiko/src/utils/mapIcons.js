import L from "leaflet";

// Ícone de caminhão personalizado para o mapa
export function getTruckIcon(color = "#3498db", isSelected = false) {
  const size = isSelected ? 40 : 40;

  return L.divIcon({
    className: "truck-marker",
    html: `
      <div style="
        transform: scale(${isSelected ? 1.2 : 1});
        filter: ${isSelected ? "drop-shadow(0 0 6px rgba(0,0,0,0.6))" : "none"};
      ">
      <svg
        width=${size}
        height=${size}
        viewBox="0 0 24 24"
        fill="${color}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 3h11v8h5l2 3v4h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V3z" />
      </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}
