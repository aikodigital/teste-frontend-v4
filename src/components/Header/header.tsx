import React from 'react';
import './header.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import companyLogo from "../../assets/logo.png"

const Header: React.FC = () => {

    return (
        <header className="header">
            <div className="container">
                <div className="d-flex align-items-center" >
                    <img src={companyLogo} alt="Logo" className="logo" />
                </div>
            </div>
        </header >
    );
};

export default Header;