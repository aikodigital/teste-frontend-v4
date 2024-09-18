import React from 'react';
import './App.css';
import LeafletMap from './components/Leaflet/Leaflet.map';
import SearchInput from './components/Filters/search.input';
import SelectOptions from './components/Filters/select.options';
import Provider from './context/FilterProvider';

function App() {
  return (
    <div
      className={`
        h-screen p-4
        flex-col items-center
        justify-center text-center
      `}
    >
      <main className="flex-grow">
        <Provider>
          <SelectOptions />
          <SearchInput />
          <LeafletMap />
        </Provider>
      </main>
      <footer className="mt-20">
        {`Project by `}
        <a
          href="https://danieldaher-portfolio.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:underline-offset-4"
        >
          {`Daniel Daher`}
        </a>
      </footer>
    </div>
  );
}

export default App;
