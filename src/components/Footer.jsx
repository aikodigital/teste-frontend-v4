import { NavLink } from 'react-router-dom';
import '../styles/footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <p>Gestor de tráfego &copy; 2024 </p>
            <p>desenvolvido por <NavLink className="footer_redirect" to="https://samuel-sabinodasilva1303.github.io/portifolio/" target='_blank'>Samuel Sabino</NavLink></p>
        </footer>
    )
}

export default Footer;