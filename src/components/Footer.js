import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; 2024 Forest Operations Dashboard. Todos os direitos reservados.</p>
                <p>Entre em contato: <a href="mailto:contato@forestops.com">contato@forestops.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;
