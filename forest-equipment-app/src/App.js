import React from 'react';
import './styles/App.css';
import EquipmentMap from './components/EquipmentMap';
import EquipmentHistory from './components/EquipmentHistory';



function App() {
  return (
    <div className="App">
      <h1>Forest Equipment Monitoring</h1>
      <EquipmentMap />
      <EquipmentHistory />
    
    </div>
  );
}

export default App;
