import React from 'react';
import Map from './components/Map';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-center text-2xl font-bold my-4">Mapa de Equipamentos</h1>
      <Map />
    </div>
  );
};

export default App;
