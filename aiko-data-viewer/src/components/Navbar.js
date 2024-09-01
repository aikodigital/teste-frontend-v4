import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import cn from 'classnames'
import s from './Navbar.module.css'
import { ROUTES } from '../constants/routes'

export function Navbar({ isOpen, toggleMenu }) {
  const menuRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [toggleMenu])

  const renderNavLink = (route, label) => {
    const isCurrentPath = pathname === route
    return (
      <li key={route} className={cn({ [s.hidden]: isCurrentPath })}>
        <NavLink onClick={() => toggleMenu(false)} to={route}>
          {label}
        </NavLink>
      </li>
    )
  }

  return (
    <div ref={menuRef} className={cn(s.menu, { [s.open]: isOpen })}>
      <div className={s.menuContent}>
        <button className={s.closeButton} onClick={() => toggleMenu(false)}>
          &times;
        </button>
        <nav className={s.navbar}>
          <ul className={s.links}>
            {renderNavLink(ROUTES.HOME, 'Página Inicial')}
            {renderNavLink(ROUTES.HISTORY, 'Histórico')}
            {renderNavLink(ROUTES.DETAILS, 'Detalhes')}
            {renderNavLink(ROUTES.PROFIT, 'Ganhos')}
          </ul>
        </nav>
      </div>
    </div>
  )
}
