import React from 'react';
import './header.css';

import companyLogo from "../../assets/logo.png"

const Header: React.FC = () => {

    return (
        <header className="header">
            <div className="px-2">
                <div className="d-flex align-items-center" >
                    <div className='d-flex'>
                        <img src={companyLogo} alt="Logo" className="logo" />
                        <h1>FrotAiko</h1>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;