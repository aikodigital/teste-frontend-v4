import { useState } from 'react'
import './App.css'
import Logo from './assets/logo.png';

function App() {

  return (
    <>
      <div className='container-title'>
        <img src={Logo} className='logo'></img>
        <input type="text" className='search' />
        <span>Equipamento Florestal</span>
      </div>
    </>
  )
}

export default App
