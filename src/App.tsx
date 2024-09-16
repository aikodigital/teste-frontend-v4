import React from 'react';
import './App.css';
import LeafletMap from './components/Leaflet/Leaflet.map';
import SearchInput from './components/Filters/search.input';
import SelectOptions from './components/Filters/select.options';
import Provider from './context/FilterProvider';

function App() {
  return (
    <div className="App">
      <Provider>
        <SelectOptions />
        <SearchInput />
        <LeafletMap />
      </Provider>
    </div>
  );
}

export default App;
