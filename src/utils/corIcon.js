import L from 'leaflet';

export const corIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        position: relative;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
        border: 2px solid white;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 6px;
          left: 6px;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};
