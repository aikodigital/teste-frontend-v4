import { useState } from 'react'
import './App.css'
import Logo from './assets/logo.png';
import Map from './components/Map.tsx'

function App() {

  return (
    <>
      <div className='container-title'>
        <img src={Logo} className='logo' alt='logo-aiko' title='logo-aiko'></img>
        <input type="text" className='search' />
        <span>Equipamento Florestal</span>
      </div>
      <Map></Map>
    </>
  )
}

export default App
