import Map from './Map';
import Footer from './Footer';
import Aiko from '../images/aiko.png';
import './App.css';

export default function App() {
  return (
    <div className="map-container">
      <img className="aiko-logo" src={Aiko} alt="aiko-logo" />
      <Map />
      <Footer />
    </div>
  );
}
