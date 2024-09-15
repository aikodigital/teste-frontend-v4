import { useEffect, useState } from 'react';

import { DivIcon, Icon, Map, Marker, TileLayer } from 'leaflet';

type MarkerProps = {
  coordinates: [number, number];
  popupValue?: string;
  tooltipValue?: string;
  icon?: Icon | DivIcon;
};
type MapProps = {
  center: [number, number];
  zoom: number;
  markers?: MarkerProps[];
};

const createMarker = ({ coordinates, popupValue, tooltipValue, icon }: MarkerProps) => {
  const marker = new Marker(coordinates);

  if (popupValue) {
    marker.bindPopup(popupValue);
  }

  if (tooltipValue) {
    marker.bindTooltip(tooltipValue);
  }

  if (icon) {
    marker.setIcon(icon);
  }

  return marker;
};

export const useMap = ({ center, zoom, markers }: MapProps) => {
  const [addedMarkers, setAddedMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const map = new Map('map', { zoom, center });
    const tileLayer = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    tileLayer.addTo(map);

    if (markers?.length) {
      for (const marker of markers) {
        const newMarker = createMarker(marker);

        setAddedMarkers((currentMarkers) => [...currentMarkers, newMarker]);
        map.addLayer(newMarker);
      }
    }

    return () => {
      addedMarkers.forEach((marker) => map.removeLayer(marker));
      map.remove();
    };
  }, []);
};
