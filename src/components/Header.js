// c:/workstation/forest-operation-app/src/components/Header.js

import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <h1>Forest Operations Dashboard</h1>
                <nav>
                    <ul>
                        <li><a href="/">Map</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
