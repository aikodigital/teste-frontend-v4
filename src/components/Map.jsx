import styles from "./Map.module.css";
import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import { useEquipments } from "../contexts/EquipmentsContext";
import { useMapState } from "../contexts/MapContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

function Map() {
  const { equipments } = useEquipments();
  const { mapState, setMapState } = useMapState();
  const [mapLat, mapLng] = useUrlPosition();
  const navigate = useNavigate();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapState((prevState) => ({
        ...prevState,
        center: [mapLat, mapLng],
      }));
    }
  }, [mapLat, mapLng, setMapState]);

  const getColorIcon = (model) => {
    let color = "#000";
    const colors = {
      "Caminhão de carga": "#41992b",
      Harvester: "#92652b",
      "Garra traçadora": "#22306d",
    };

    if (model && model.name) {
      color = colors[model.name];
    }

    return L.divIcon({
      className: "custom-icon",
      html: `<div style="background-color:${color}; width:24px; height:24px; border-radius:50%; border: 2px solid white;"></div>`,
    });
  };

  const handleMarkerClick = (equip) => {
    navigate(
      `/app/equipments/${equip.id}?lat=${equip.lastHistory.lat}&lng=${equip.lastHistory.lon}`
    );
  };

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapState.center}
        zoom={mapState.zoom}
        scrollWheelZoom={true}
        whenCreated={(map) => {
          map.on("moveend", () => {
            const newCenter = map.getCenter();
            const newZoom = map.getZoom();
            setMapState({
              center: [newCenter.lat, newCenter.lng],
              zoom: newZoom,
            });
          });
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.isArray(equipments) &&
          equipments.map((equip) =>
            equip.lastHistory ? (
              <Marker
                position={[equip.lastHistory.lat, equip.lastHistory.lon]}
                key={equip.id}
                icon={getColorIcon(equip.model)}
                eventHandlers={{
                  click: () => handleMarkerClick(equip),
                }}
              >
                <Popup>
                  <span>{equip.name}</span>
                  {equip.model && <span>{equip.model.name}</span>}
                  {equip.lastStates && (
                    <span style={{ color: equip.lastStates.color }}>
                      {equip.lastStates.name}
                    </span>
                  )}
                </Popup>
              </Marker>
            ) : null
          )}
      </MapContainer>
    </div>
  );
}

Map.propTypes = {
  position: PropTypes.array.isRequired,
};

export default Map;
