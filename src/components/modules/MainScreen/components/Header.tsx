import React, { Fragment } from 'react'

import './Header.scss'

const Header = () => {
  return (
    <Fragment>
      <div className='header-container'>
        <div className='content-container'>
          <div className='inputs-container'>
            <label htmlFor="filter-input" className='input-label'>Filtrar estado</label>
            <input type="text" className='text-input' />
          </div>

          <div className='inputs-container'>
            <label htmlFor="filter-input" className='input-label'>Filtrar equipamento</label>
            <input type="text" className='text-input' />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header