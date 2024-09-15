import React from 'react';
import { Container } from 'react-bootstrap';
import EquipmentMap from './components/EquipamentMap';
import Header from './components/Header';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Container fluid>
        <h1 className="text-center my-4">Rastreie seu equipamento!</h1>
        <EquipmentMap />
      </Container>
    </div>
  );
};

export default App;
