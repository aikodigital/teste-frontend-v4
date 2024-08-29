import { Box, Stack, Text } from "@mantine/core";
import L from "leaflet";
import { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { useMap } from "react-leaflet";

const PositionMarker = ({ data }) => {
  const map = useMap();

  const renderComponentToHtml = (component) => {
    return ReactDOMServer.renderToStaticMarkup(component);
  };

  const positionIcon = (positionNumber) => {
    const content = renderComponentToHtml(
      <Stack spacing={0}>
        <Box sx={{ marginBottom: -12 }}>
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 3.5C8.44 3.5 5.5 6.44 5.5 10c0 5.5 6.5 14 6.5 14s6.5-8.5 6.5-14c0-3.56-2.94-6.5-6.5-6.5zM12 18a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
              fill="#000"
            />
          </svg>
        </Box>
        <Text>{positionNumber}</Text>
      </Stack>
    );

    return L.divIcon({
      className: "position-icon",
      html: content,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.positions, map]);
};

export default PositionMarker;
