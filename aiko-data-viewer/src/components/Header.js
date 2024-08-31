import React from 'react'
import cn from 'classnames'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

export function Header({ isOpen, toggleMenu }) {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavLink to={'/'}>
          <h1>Aiko Equipment Viewer</h1>
        </NavLink>
        <button className={cn(s.menuButton, { [s.open]: isOpen })} onClick={toggleMenu}>
          Open Menu
        </button>
      </div>
    </header>
  )
}
