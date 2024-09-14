import React from 'react';
import './App.css';
import LeafletMap from './components/Leaflet/Leaflet.map';
import SearchInput from './components/Filters/search.input';
import SelectInput from './components/Filters/select.input';
import Provider from './context/FilterProvider';

function App() {
  return (
    <div className="App">
      <Provider>
        <SelectInput />
        <SearchInput />
        <LeafletMap />
      </Provider>
    </div>
  );
}

export default App;
