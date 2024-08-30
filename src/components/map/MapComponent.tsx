import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useNavigate, useParams } from "react-router-dom";
import { IPosition } from "../../models/EquipmentPositionHistory";

import "./MapComponent.css";

const MapComponent = ({ positions }: { positions: IPosition[] }) => {
  const navigate = useNavigate();

  const firstPosition = {
    lat: positions[0].lat,
    lng: positions[0].lon,
  };

  const handleBackButtonClick = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <div className="map-container">
      <div className="header">
        <h2>{positions[0].date}</h2>
        <button className="back-button" onClick={handleBackButtonClick}>
          Voltar
        </button>
      </div>
      <APIProvider apiKey={process.env.REACT_APP_MAP_KEY || ""}>
        <Map defaultCenter={firstPosition} defaultZoom={10} className="map">
          {positions.map((position, index) => (
            <Marker
              key={index}
              position={{ lat: position.lat, lng: position.lon }}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
