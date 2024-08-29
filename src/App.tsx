import React from 'react';

// components
import Map from './components/Map/MapComponent';
import SideBar from './components/SideBar/SideBarComponent';
import Search from './components/Search/SearchComponent';

//style
import './App.css';

function App() {
  return (
    <>
     <div>
        <Search />
      </div>
      <div className='d-flex'>
          <SideBar />
          <Map />
      </div>
    </>

  );
}

export default App;