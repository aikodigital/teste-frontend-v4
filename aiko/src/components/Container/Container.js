import React from 'react'
import './Container.scss'

function Container(props) {
  return (
    <div className='largeContainer'>{props.children}</div>
  )
}

export default Container