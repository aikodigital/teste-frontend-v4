import "./index.css";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression, DivIcon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  return (
    <div className="container">
      <header>
        <nav>
        <img src="../img/aiko.png" alt="Aiko Icon" />
        <Link to={""} >Map</Link>
        <Link to={""} >Delivery Trucks</Link>
        </nav>
      </header>

      
    </div>
  )
}

export default App
