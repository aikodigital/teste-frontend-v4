import React from 'react'
import cn from 'classnames'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

export function Header({ isOpen, toggleMenu }) {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavLink to={'/'}>
          <h1 className={s.title}>Aiko Equipment Viewer</h1>
          <img className={s.icon} src='/aiko.png' alt='Aiko' />
        </NavLink>
        <button className={cn(s.menuButton, { [s.open]: isOpen })} onClick={toggleMenu}>
          <div className={s.burgerIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  )
}
