import L from "leaflet";

export const createSvgIcon = (modelName: string, color: string) => {
  const iconSize = 40;

  let svgPath;
  switch (modelName) {
    case "Harvester":
      svgPath = `M3 12h18v3H3v-3zm0 5h18v3H3v-3zm4-11h10v3H7V6z`;
      break;
    case "Caminhão de carga":
      svgPath = `M2 16v-7h13v7h5v2H3v-2h-1zm16-2h2v-3h-2v3zM6 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm10-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z`;
      break;
    case "Garra traçadora":
      svgPath = `M12 2l1.5 5H18l-4.5 4 1.5 5L12 14l-3 2 1.5-5L6 7h4.5z`;
      break;
    default:
      svgPath = "M0 0 L40 0 L40 40 L0 40 Z";
      break;
  }

  return L.divIcon({
    html: `
        <svg width="${iconSize}" height="${iconSize}" xmlns="http://www.w3.org/2000/svg">
          <path d="${svgPath}" fill="${color}" />
        </svg>`,
    className: "",
    iconSize: [iconSize, iconSize],
  });
};
