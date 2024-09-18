import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
  const [mapState, setMapState] = useState({
    center: [-19.12311202469872, -45.97023010253907],
    zoom: 11,
  });

  return (
    <MapContext.Provider value={{ mapState, setMapState }}>
      {children}
    </MapContext.Provider>
  );
}

MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useMapState() {
  return useContext(MapContext);
}
