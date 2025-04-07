import { useState } from 'react'
import './App.css'
import Logo from './assets/logo.png';

function App() {

  return (
    <>
      <div className='container-title'>
        <img src={Logo}></img>
        <label>Teste</label>
        <input type="text" />
        <span>Equipamento Florestal</span>
      </div>
    </>
  )
}

export default App
