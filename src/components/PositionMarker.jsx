import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const PositionMarker = ({ data }) => {
  const map = useMap();

  const positionIcon = (positionNumber) => {
    return L.divIcon({
      className: "position-icon",
      html: `<div>${positionNumber}</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  useEffect(() => {
    if (data.positions?.length > 0) {
      data.positions?.forEach((position, index) => {
        const marker = L.marker([position.lat, position.lon], { icon: positionIcon(index + 1) }).addTo(map);
        marker.bindPopup("This is a custom Leaflet marker!").openPopup();
      });
    }
  }, [data.positions, map]);
};

export default PositionMarker;
