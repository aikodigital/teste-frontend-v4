import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Coords } from "@/helpers/types";

export function RecenterAutomatically(coords: Coords) {
  const map = useMap();
  useEffect(() => {
    if (!coords?.lat) {
      map.setView({ lat: -22.637081990512296, lng: -54.823245482408126 })
      return;
    }
    map.setView({ lat: coords.lat, lng: coords.lng })
  }, [map, coords?.lat, coords?.lng])
  return null;
}
