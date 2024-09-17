import { NavLink } from 'react-router-dom';

import '../styles/header.scss'
const Navbar = () => {
    return (
        <nav >
            <NavLink to="/">
                <img 
                    src="https://aiko.digital/wp-content/themes/aiko/assets/img/aiko-logo.png" 
                    alt="Aiko Logo" 
                    heigth="48"
                    width="98"
                />
            </NavLink>
            <ul >
                <li>
                    <NavLink className="button-about" to="/about">Sobre o projeto</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;