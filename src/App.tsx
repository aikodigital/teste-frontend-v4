import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import EquipmentMap from './components/EquipmentMap';
import EquipmentDetails from './components/EquipmentDetails';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EquipmentMap />} />
        <Route path="/details/:id" element={<EquipmentDetailsPage />} />
      </Routes>
    </Router>
  );
};

const EquipmentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      {id && <EquipmentDetails equipmentId={id} />}
    </div>
  );
};

export default App;
