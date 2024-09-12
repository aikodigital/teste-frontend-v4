import React from 'react';
import EquipmentMap from './components/EquipmentMap';
import './styles/globals.scss';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="text-center text-2xl font-bold my-4">Operação Florestal</h1>
      <EquipmentMap />
    </div>
  );
};

export default App;
 