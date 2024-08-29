import React, { Fragment } from 'react'
import Map from '../Map/Map'
import Header from './components/Header'

import './MainScreen.scss'

const MainScreen = () => {
  return (
    <Fragment>
      <div className='main-container'>
        <Header />
        <Map />
      </div>
    </Fragment>
  )
}

export default MainScreen