import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { LogoIcon } from '../LogoIcon';

import { MenuSharp, MenuOpen } from '@mui/icons-material';
const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterna entre aberto e fechado
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <LogoIcon src={'/img/aiko.png'} />
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? <MenuSharp /> : <MenuOpen />}
      </div>

      {/* Menu de navegação */}
      <ul className={`${styles.navMenu} ${isOpen ? styles.open : ''}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/historico"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setIsOpen(false)}
          >
            Historico
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/faturamento"
            className={({ isActive }) => (isActive ? styles.active : '')}
            onClick={() => setIsOpen(false)}
          >
            Faturamento
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
