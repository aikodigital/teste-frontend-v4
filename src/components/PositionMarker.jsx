import { Stack, Text } from "@mantine/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
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

  const renderComponentToHtml = (component) => {
    return ReactDOMServer.renderToStaticMarkup(component);
  };

  useEffect(() => {
    if (data.positions?.length > 0) {
      data.positions?.forEach((position, index) => {
        const content = renderComponentToHtml(
          <Stack spacing={8}>
            <Text weight={700} ta="center">
              Coordenadas
            </Text>
            <Text>
              Latitude: {position.lat}, longitude: {position.lon}
            </Text>
          </Stack>
        );

        const marker = L.marker([position.lat, position.lon], { icon: positionIcon(index + 1) }).addTo(map);
        marker.bindPopup(content).openPopup();
      });
    }
  }, [data.positions, map]);
};

export default PositionMarker;
